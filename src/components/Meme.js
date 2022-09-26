import React, { useEffect } from 'react'
import Image from './Image'

/**
 * Challenge: 
 * As soon as the Meme component loads the first time,
 * make an API call to "https://api.imgflip.com/get_memes".
 * 
 * When the data comes in, save just the memes array part
 * of that data to the `allMemes` state
 * 
 * Think about if there are any dependencies that, if they
 * changed, you'd want to cause to re-run this function.
 * 
 * Hint: for now, don't try to use an async/await function.
 * Instead, use `.then()` blocks to resolve the promises
 * from using `fetch`. We'll learn why after this challenge.
 */

function Meme() {
    const [meme, setMeme] = React.useState({
        topText: '',
        bottomText: '',
        randomImage: ''
    });

    const [allMemes, setAllMemes] = React.useState();

    const generateMeme = (event) => {
        event.preventDefault();

        const randomMeme = getRandomMeme(allMemes.data.memes);

        setMeme(prevValue => {
            return { ...prevValue, randomImage: randomMeme.url }
        })
    }

    const getRandomMeme = (memes) => {
        return memes && memes[Math.floor(Math.random() * memes.length)];
    }

    const updateText = (e) => {
        const { name, value } = e.target;

        setMeme(text => {
            return { ...meme, [name]: value }
        })
    }

    // The async/await way
    // const getMemeImages = async (e) => {
    //     var memes = [];

    //     try {
    //         const response = await fetch('https://api.imgflip.com/get_memes');
    //         memes = await response.json();
    //         return memes;
    //     } catch (e) {

    //     } finally {
    //         return memes;
    //     }
    // }

    React.useEffect(() => {
        // The async/await way
        // var images = getMemeImages();
        // images.then((val) => { setAllMemes((e) => val) })

        var simpleFetch = fetch('https://api.imgflip.com/get_memes').then(
            (response) => {
                if (!response.ok) {
                    throw new Error('Http error encountered! ' + response.status)
                }

                return response.json()
            }
        ).then(
            // If response is OK and data passed 
            (response) => {
                // Set the AllMemes array
                setAllMemes(e => response)

                // Set the default image (Randomized) 
                var randomMeme = response.data && getRandomMeme(response.data.memes)

                if (randomMeme) {
                    meme.randomImage = randomMeme.url;
                }
            }
        )
    }, [])

    return (
        <>
            <form className="form">
                <div className="input-group">
                    <input type="text" placeholder="Text above" name="topText" onChange={updateText}></input>
                    <input type="text" placeholder="Text below" name="bottomText" onChange={updateText}></input>
                </div>

                <button className="btn btn-orange" type="submit" onClick={generateMeme}>Get new meme image</button>
            </form>

            <Image
                image={meme.randomImage}
                topText={meme.topText}
                bottomText={meme.bottomText} />
        </>
    )
}

export default Meme