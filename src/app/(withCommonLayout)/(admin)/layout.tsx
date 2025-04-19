import Container from "@/src/components/UI/Container";
import Sidebar from "@/src/components/UI/sidebar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <Container>
      <div
        className="my-3 flex w-full gap-12 flex-col md:flex-row "
        style={{ height: "calc(100vh - 200px)" }}>
        {/* Sidebar */}
        <div className="w-full md:w-1/3">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="w-full md:w-11/12">{children}</div>
      </div>
    </Container>
  );
};

export default layout;
