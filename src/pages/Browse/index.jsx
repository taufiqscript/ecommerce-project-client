import BrowseLayout from "@/components/layouts/BrowseLayout"
import BoardMenu from "@/components/modules/Landing/BoardMenu"
import CategoryMenu from "@/components/modules/Landing/CategoryMenu"
import Footer from "@/components/modules/Landing/Footer"
import Modal from "@/components/modules/Browse/Modal"
import Navbar from "./Navbar"

const Browse = () => {
    return (
        <BrowseLayout>
            <Navbar />
            <BoardMenu />
            <CategoryMenu />
            <Footer />
            <Modal />
        </BrowseLayout>
    )
}

export default Browse