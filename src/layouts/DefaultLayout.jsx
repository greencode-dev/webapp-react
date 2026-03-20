import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Container } from "react-bootstrap"

function DefaultLayout() {
    return (
        <div className="default-layout d-flex flex-column min-vh-100">
            <Header />
            <main className="flex-fill py-5">
                <Container>
                    <Outlet />
                </Container>
            </main>
            <Footer />
        </div>
    )
}

export default DefaultLayout