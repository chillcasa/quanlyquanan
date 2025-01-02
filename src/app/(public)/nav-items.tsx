'use client'

import { getAccessTokenFromLocalStorage } from '@/lib/utils'
import Link from 'next/link'
import { useEffect, useState } from 'react'



const menuItems = [
  {
    title: 'Món ăn',
    href: '/menu' // authRequired = indefined la  da dang nhap hay chua deu cho hien thi
  },
  {
    title: 'Đơn hàng',
    href: '/orders'
  },
  {
    title: 'Đăng nhập',
    href: '/login',
    authRequired: false // false la chua dang nhap thi se hien thi
  },
  {
    title: 'Quản lý',
    href: '/manage/dashboard',
    authRequired: true // true la dang nhap roi moi hien thi
  }
]

export default function NavItems({ className }: { className?: string }) {
  const [isAuth, setIsAuth] = useState(false)
  useEffect (() => {
    setIsAuth(Boolean(getAccessTokenFromLocalStorage))
  })
  return menuItems.map((item) => {
    if(
      (item.authRequired === true && !isAuth)  ||
      (item.authRequired === false && isAuth)  
    ) 
    return null

    return (
      <Link href={item.href} key={item.href} className={className}>
        {item.title}
      </Link>
    )
  })
}
