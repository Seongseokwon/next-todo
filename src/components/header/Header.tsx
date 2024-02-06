'use client';
import {signOut, useSession} from "next-auth/react";
import Button from "@/components/ui/button/Button";
import {FaSignOutAlt} from "react-icons/fa";
import styles from './Header.module.scss';

export default function Header() {
    const {data : session} = useSession()

    const handleSignOut = async () => {
        await signOut();
    }
    return <header className={styles['header']}>
        <h1>title</h1>
        {session ? <Button borderStyle='none' onClick={handleSignOut}><FaSignOutAlt /></Button> : ''}
    </header>
}