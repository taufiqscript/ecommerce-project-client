import { atom } from "jotai";
import { atomWithStorage } from 'jotai/utils'

export const languageStorageAtom = atomWithStorage("language", "id")
export const emailstorageAtom = atomWithStorage('email', null)
export const tokenStorageAtom = atomWithStorage('token', null)
export const userIdStorageAtom = atomWithStorage('id user', null)
export const cartListStorageAtom = atomWithStorage('cart', [])
export const quantitiesStorageAtom = atomWithStorage('qty', null)
export const chosedAddressStorageAtom = atomWithStorage('address', null)

export const isOpenModalAtom = atom(false)
export const isOpenModalAddressAtom = atom(false)
export const printStrukModalAtom = atom(false)
export const idProductAtom = atom(null)
export const passwordAtom = atom(null)
export const emailAtom = atom(null)
export const dataProductAtom = atom([])
export const refreshAtom = atom(false)
export const isClickedAtom = atom(false)
export const formAtom = atom({
    fullName: "",
    phone: "",
    province: "",
    city: "",
    district: "",
    postalCode: "",
    street: "",
    detail: "",
    label: ""
})