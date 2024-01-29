import {ReactNode} from "react";
import Header from "@/components/header/Header";
import BottomNavigation from "@/components/bottomNavigation/BottomNavigation";


interface LayoutProps {
    children: ReactNode
    layoutType : 'main' | 'division'
}

type LayoutOnlyChild = Omit<LayoutProps, 'layoutType'>;
export default function Layout({children, layoutType = 'main'}: LayoutProps) {
    const LayoutMap = {
        'main' : <MainLayout>{children}</MainLayout>,
        'division' : <DivisionLayout>{children}</DivisionLayout>
    }

    return LayoutMap[layoutType];
}

const MainLayout = ({children}: LayoutOnlyChild) => {
    return <div>
        {children}
    </div>
}
const DivisionLayout= ({children}: LayoutOnlyChild) => {
    return <div>
        <Header />
        {children}
        <BottomNavigation />
    </div>
}