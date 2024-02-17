import pig from './images/pig.png'


function Landing() {
    return (
        <div className='text-center  p-3 '>
                <img src={pig} className="figure-img img-fluid text-center  w-50 p-3 pig mb-1" alt="pig logo"></img>
                <br></br>
                <a href='/register' className='btn btn-primary text-center text-white text-decoration-none'>Sign up here</a>
           
        </div>
    )
}





export default Landing;