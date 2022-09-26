import React from 'react'

function Image({ image, topText, bottomText }) {
    return (
        <>
            {
                image &&

                <div className="meme">
                    <img src={image} className="meme-image" />
                    {topText && <h2 className="meme-text top">{topText}</h2>}
                    {bottomText && <h2 className="meme-text bottom">{bottomText}</h2>}
                </div>
            }
        </>
    )
}

export default Image