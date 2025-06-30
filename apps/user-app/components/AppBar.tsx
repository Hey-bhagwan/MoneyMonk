import { Button } from "./button";
import Image from "next/image";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: any,
    onSignout: any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    return <div className="flex justify-between border-b  w-full">
        <div className="flex items-center justify-between p-4 shadow bg-white w-full">
            <a href="/" className="flex items-center space-x-2">
                <Image
                    src="/logo.jpeg"
                    alt="MoneyMonk Logo"
                    width={36}
                    height={36}
                    className="object-contain"
                    priority                                                                                                                                            
                />
                <span className="text-xl font-semibold text-purple-700">MoneyMonk</span>
            </a>
            <div className="flex flex-col justify-center pt-2">
                <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
            </div>
        </div>
    </div>
}

