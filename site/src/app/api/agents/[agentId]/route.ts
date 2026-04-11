import { NextRequest, NextResponse } from 'next/server';
import { getAgent } from '@/data/agents';
import { agentSkills } from '@/data/agent-skills';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ agentId: string }> }
) {
  const { agentId } = await params;
  const agent = getAgent(agentId);

  if (!agent) {
    return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
  }

  const skill = agentSkills[agentId];
  if (!skill) {
    return NextResponse.json(
      { error: 'Agent skill not found' },
      { status: 404 }
    );
  }

  const { document } = await request.json();

  if (!document || typeof document !== 'string') {
    return NextResponse.json(
      { error: 'Document text is required' },
      { status: 400 }
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Agent service not configured' },
      { status: 503 }
    );
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        system: skill,
        messages: [
          {
            role: 'user',
            content: `Please analyze the following document:\n\n${document}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: 'Agent failed', details: errorData },
        { status: 500 }
      );
    }

    const data = await response.json();
    const content = data.content[0]?.text || '';

    // Try to parse JSON from the response
    let findings;
    try {
      const jsonMatch = content.match(/\[[\s\S]*\]|\{[\s\S]*\}/);
      findings = jsonMatch ? JSON.parse(jsonMatch[0]) : content;
    } catch {
      findings = content;
    }

    return NextResponse.json({
      agentId,
      agentName: agent.name,
      findings,
      raw: content,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Agent execution failed', details: String(error) },
      { status: 500 }
    );
  }
}
