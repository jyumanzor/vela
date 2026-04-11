import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts, getBlogPost, categoryColors, categoryLabels } from '@/data/blog-posts';
import { ConstellationDivider } from '@/components/ConstellationDivider';

const fi = 'var(--font-instrument), serif';
const fd = 'var(--font-dm-sans), sans-serif';
const fj = 'var(--font-jetbrains), monospace';

export function generateStaticParams() {
  return blogPosts.map((p) => ({ id: p.id }));
}

function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function renderContent(content: string) {
  const blocks = content.split('\n\n');
  const elements: React.ReactNode[] = [];

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i].trim();
    if (!block) continue;

    if (block.startsWith('```')) {
      const code = block.replace(/^```\w*\n?/, '').replace(/\n?```$/, '');
      elements.push(
        <pre
          key={i}
          style={{
            fontFamily: 'var(--font-jetbrains), monospace',
            fontSize: 13,
            lineHeight: 1.6,
            background: 'var(--understory)',
            border: '1px solid var(--stardust)',
            borderRadius: 8,
            padding: '16px 20px',
            overflowX: 'auto',
            color: 'var(--dusk)',
            margin: '24px 0',
          }}
        >
          {code}
        </pre>,
      );
      continue;
    }

    if (block.startsWith('>')) {
      const text = block.replace(/^>\s?/gm, '');
      elements.push(
        <blockquote
          key={i}
          style={{
            background: 'var(--understory)',
            borderLeft: '3px solid var(--ember-copper)',
            borderRadius: '0 8px 8px 0',
            padding: '16px 20px',
            margin: '24px 0',
            fontFamily: fd,
            fontSize: 15,
            color: 'var(--dusk)',
            lineHeight: 1.7,
          }}
        >
          {renderInline(text)}
        </blockquote>,
      );
      continue;
    }

    if (block.split('\n').every((l) => l.trimStart().startsWith('- '))) {
      const items = block.split('\n').map((l) => l.replace(/^\s*-\s/, ''));
      elements.push(
        <ul
          key={i}
          style={{
            margin: '16px 0',
            paddingLeft: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          {items.map((item, j) => (
            <li
              key={j}
              style={{
                fontFamily: fd,
                fontSize: 16,
                color: 'var(--moonlight)',
                lineHeight: 1.8,
              }}
            >
              {renderInline(item)}
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    elements.push(
      <p
        key={i}
        style={{
          fontFamily: fd,
          fontSize: 16,
          color: 'var(--moonlight)',
          lineHeight: 1.8,
          margin: '20px 0',
        }}
      >
        {renderInline(block)}
      </p>,
    );
  }

  return elements;
}

function renderInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*(.+?)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\))/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[2]) {
      parts.push(
        <strong key={match.index} style={{ fontWeight: 600, color: 'var(--moonlight)' }}>
          {match[2]}
        </strong>,
      );
    } else if (match[3]) {
      parts.push(
        <code
          key={match.index}
          style={{
            fontFamily: 'var(--font-jetbrains), monospace',
            fontSize: '0.9em',
            background: 'var(--understory)',
            border: '1px solid var(--stardust)',
            borderRadius: 4,
            padding: '1px 6px',
          }}
        >
          {match[3]}
        </code>,
      );
    } else if (match[4] && match[5]) {
      parts.push(
        <a
          key={match.index}
          href={match[5]}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--star-gold)', textDecoration: 'underline' }}
        >
          {match[4]}
        </a>,
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = getBlogPost(id);
  if (!post) notFound();

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 24px' }}>
      <section style={{ paddingTop: 140, paddingBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{
            fontFamily: fj,
            fontSize: 12,
            color: 'var(--constellation)',
            letterSpacing: '0.03em',
          }}>
            {formatDate(post.date)}
          </span>
          <span style={{
            fontFamily: fj,
            fontSize: 10,
            color: categoryColors[post.category],
            border: `1px solid ${categoryColors[post.category]}`,
            borderRadius: 4,
            padding: '2px 8px',
            opacity: 0.85,
          }}>
            {categoryLabels[post.category]}
          </span>
        </div>

        <h1 style={{
          fontFamily: fi,
          fontSize: 'clamp(28px, 5vw, 40px)',
          color: 'var(--moonlight)',
          lineHeight: 1.15,
          marginBottom: 8,
        }}>
          {post.title}
        </h1>

        <p style={{
          fontFamily: fd,
          fontSize: 16,
          color: 'var(--dusk)',
          marginBottom: 0,
        }}>
          {post.subtitle}
        </p>
      </section>

      <div style={{ margin: '8px 0 16px' }}>
        <ConstellationDivider brightIndices={[1, 3]} />
      </div>

      <article style={{ paddingBottom: 40 }}>
        {renderContent(post.content)}
      </article>

      {post.type === 'cross-post' && post.sourceUrl && (
        <div style={{
          background: 'var(--deep-canopy)',
          border: '1px solid var(--stardust)',
          borderRadius: 12,
          padding: '24px 28px',
          marginBottom: 40,
        }}>
          <p style={{
            fontFamily: fd,
            fontSize: 14,
            color: 'var(--dusk)',
            marginBottom: 8,
          }}>
            This post is adapted from an essay on jennumanzor.com.
          </p>
          <a
            href={post.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: fd,
              fontSize: 15,
              fontWeight: 500,
              color: 'var(--star-gold)',
              textDecoration: 'none',
            }}
          >
            Read the original essay {'\u2192'}
          </a>
        </div>
      )}

      <ConstellationDivider brightIndices={[2]} />

      <div style={{ padding: '24px 0 80px' }}>
        <Link
          href="/blog"
          style={{
            fontFamily: fd,
            fontSize: 14,
            fontWeight: 500,
            color: 'var(--star-gold)',
            textDecoration: 'none',
          }}
        >
          {'\u2190'} Back to blog
        </Link>
      </div>
    </div>
  );
}
