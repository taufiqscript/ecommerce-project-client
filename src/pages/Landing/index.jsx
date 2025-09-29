import DefaultLayout from "@/components/layouts/DefaultLayout"
import BoardMenu from "@/components/modules/Landing/BoardMenu"
import CategoryMenu from "@/components/modules/Landing/CategoryMenu"
import Footer from "@/components/modules/Landing/Footer"
import Navbar from "./Navbar"

const Landing = () => {
    return (
        <DefaultLayout>
            <Navbar />
            <BoardMenu />
            <CategoryMenu />
            <Footer />
        </DefaultLayout>
    )
}

export default Landing