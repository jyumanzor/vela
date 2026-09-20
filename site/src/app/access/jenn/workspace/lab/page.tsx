import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  verifyAdmin,
  adminCookieName,
  verifyToken,
  cookieName,
} from "@/lib/clientAuth";
import { privateLabContent } from "@/lib/private-lab-content";
import UseCaseLab from "@/components/lab/UseCaseLab";
import "./lab.css";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "AI Use-Case Lab | Vela",
  robots: { index: false, follow: false },
};
export default async function Page() {
  const c = await cookies();
  if (
    !verifyAdmin(c.get(adminCookieName)?.value) &&
    !verifyToken("jenn", c.get(cookieName("jenn"))?.value)
  )
    redirect("/access/jenn/workspace");
  const {evidenceRows,strategyProblems}=privateLabContent();
  return (
    <div className="migrated-lab">
      <UseCaseLab
        evidenceRows={evidenceRows}
        strategyProblems={strategyProblems}
      />
    </div>
  );
}
