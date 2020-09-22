import React, {useState, useEffect} from "react";
import axios from 'axios';

const Convert = ({language, text}) => {

    const [translated, setTranslated] = useState('');
    const [debouncedText, setDebouncedText] = useState(text);

    // we are going to rerun this hook when text changes
    useEffect( () => {
        const timerId = setTimeout( () => {
            setDebouncedText(text);
        }, 500);

        // if the text changes before 500 elapses we want to cancel that timer
        return () => {
            clearTimeout(timerId);
        }

    }, [text]);

    useEffect( () => {

        const doTranslation = async () => {

           // destruction data from response
          const {data} = await axios.post( 'https://translation.googleapis.com/language/translate/v2',
                {},
                {
                    params: {
                        q: debouncedText,
                        target: language.value,
                        // the key can only be run on http://localhost:3000/ due to restriction
                        // please provide the key
                        key: ""
                    }
                }
            );
            setTranslated(data.data.translations[0].translatedText);
        };
        // calling to get the translation from the server
        doTranslation();

     // any time whe we get the new language or text the useEffect will run
    }, [language, debouncedText]);

    return (
        <div>
            <h1 className="ui header">
                {translated}
            </h1>
        </div>
    )
}

export default Convert;