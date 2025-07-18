"use client"

import { useAuth } from "@/context/auth"

import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback } from "./ui/avatar"
import Image from "next/image"

export default function AuthButtons() {
    const auth = useAuth() 

    return (
        <div>
            {
                !!auth?.currentUser && 
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar className="cursor-pointer">
                            {
                                !!auth.currentUser.photoURL && (
                                    <Image src={auth.currentUser.photoURL}
                                    alt={`${auth.currentUser.displayName} avatar`}
                                    width={70} 
                                    height={70}
                                    />
                                )
                            }
                            <AvatarFallback>
                                {(auth.currentUser.displayName || auth.currentUser.email)?.[0]}
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>
                            <div>{auth.currentUser.displayName}</div>
                            <div className="font-normal text-xs">{auth.currentUser.email}</div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                         <DropdownMenuItem className="cursor-pointer" asChild>
                            <Link href="/account">
                               My Account
                            </Link>
                         </DropdownMenuItem>
                          {
                            !!auth.customClaims?.admin && (
                                <DropdownMenuItem className="cursor-pointer" asChild>
                                  <Link href="/admin-dashboard">
                                     Admin Dashboard
                                  </Link>
                                </DropdownMenuItem>
                            )
                          }
                          {
                            !auth.customClaims?.admin && (
                                 <DropdownMenuItem className="cursor-pointer" asChild>
                                   <Link href="/account/my-favourites">
                                      My Favourites
                                   </Link>
                                 </DropdownMenuItem>
                            )
                          }
                         <DropdownMenuItem className="cursor-pointer" onClick={async() => {
                            await auth.logout();
                         }}>
                            Logout
                         </DropdownMenuItem>
                        
                    </DropdownMenuContent>
                </DropdownMenu>
            }
            {
                !auth?.currentUser && 
                <div className="flex gap-2 items-center">
                  <Link href="/login" className="uppercase tracking-widest hover:underline">
                     Login
                  </Link>
                  <div className="h-8 w-[1px] bg-white/50"></div>
                  <Link href="/register" className="uppercase tracking-widest hover:underline">
                     Signup
                  </Link>
                </div>
            }
        </div>
    )
}