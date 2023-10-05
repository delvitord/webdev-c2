import create from 'zustand'
import {persist} from 'zustand/middleware'


let appCv = (set) => ({
    dopen: true,
    updateOpen:(dopen) => set((state)=> ({dopen:dopen})),
})

appCv = persist (appCv, {name: "my_cv_app"})

export const useAppCv = create(appCv)