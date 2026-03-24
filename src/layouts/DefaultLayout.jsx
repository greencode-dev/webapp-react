import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"

function DefaultLayout() {
    return (
        <div className="default-layout d-flex flex-column min-vh-100">
            <Header />
            <main className="flex-fill py-5">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default DefaultLayout