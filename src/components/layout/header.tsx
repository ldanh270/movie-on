import Logo from '@/components/header/logo'
import { ModeToggle } from '@/components/header/mode-toggle'
import Navbar from '@/components/header/navbar'
import SearchBox from '@/components/header/search-box'

const Header = () => {
    return (
        <div className="flex flex-row justify-around border-b-1 py-2.5">
            <Logo />
            <Navbar />
            <div className="flex justify-center items-center gap-1">
                <SearchBox />
                <ModeToggle />
            </div>
        </div>
    )
}
export default Header
