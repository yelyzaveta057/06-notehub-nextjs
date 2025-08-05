'use client';

type Props ={
    error: Error;
    reset: () => void;
};

const Error =({error} : Props) =>{
    return(
        <div>
            <h2>Error</h2>
            <p>Could not fetch the list of notes. {error.message}</p>

        </div>
    );
}

export default Error;