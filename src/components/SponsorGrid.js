import React from 'react'

const SponsorGrid = () => {
  return (
    <section className='sponsors'>
        <div className="container">
            <h3>Our sponsors</h3>
            <div className="row">
                <div className="col-md-3">
                    <div className="image_wrap">
                        <img src="https://pixelflames.com/wp-content/uploads/2019/12/bridgestone.png" alt="logo" />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="image_wrap">
                        <img src="https://pixelflames.com/wp-content/uploads/2019/12/nescafe_new.png" alt="logo" />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="image_wrap">
                        <img src="https://pixelflames.com/wp-content/uploads/2019/12/nestle.png" alt="logo" />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="image_wrap">
                        <img src="https://pixelflames.com/wp-content/uploads/2019/12/odepc_new.png" alt="logo" />
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default SponsorGrid;