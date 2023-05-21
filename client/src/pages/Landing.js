
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import {Logo} from '../components';
import {Link} from 'react-router-dom';


const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav> 
      <div className = "container page">
      <div className='info'>
        <h1>
          job <span>tracking</span> app
        </h1>
        <p>I'm baby poke hella skateboard, yuccie whatever typewriter normcore vexillologist disrupt distillery DSA photo booth viral lyft PBR&B. Bitters PBR&B prism brunch craft beer +1 master cleanse lo-fi. Blog cliche ugh pop-up literally. Pour-over activated charcoal chillwave austin helvetica quinoa. Waistcoat kogi XOXO roof party four loko messenger bag. Ugh tilde man braid, JOMO kinfolk tumeric skateboard salvia tofu food truck marxism.</p>
      <Link to="/register" className = "btn btn-hero">Login/Register</Link>
      </div>
      <img src = {main} alt="job hunt" className = "img main-img" />
    </div>
    </Wrapper>


  )
}



export default Landing