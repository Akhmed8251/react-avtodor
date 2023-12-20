import React, { useEffect } from 'react';
const SpecialVersion = () => {

useEffect(() => {

    const loadScripts = async () => {

        try {

        await loadScript("https://lidrekon.ru/slep/js/jquery.js");

        await loadScript("https://lidrekon.ru/slep/js/uhpv-full.min.js");

        } catch (error) {

        console.error("Error loading scripts:", error);

        }

    };

    const loadScript = (src) => {

        return new Promise((resolve, reject) => {

            const script = document.createElement('script');

            script.src = src;

            script.async = true;

            script.onload = resolve;

            script.onerror = reject;

            document.body.appendChild(script);

        });

    };

    loadScripts();

    return () => {

        // Clean up on component unmount

        document.body.removeChild(document.querySelector ('script[src="https://lidrekon.ru/slep/js/jquery.js"]'));

        document.body.removeChild(document.querySelector ('script[src="https://lidrekon.ru/slep/js/uhpv-full.min.js"]'));

    };

}, []);

return (
<></>
);

};

export default SpecialVersion;