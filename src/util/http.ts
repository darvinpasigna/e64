const get = async(url: string) =>{
    const response = await fetch(url); //wait until fetch resolved with promise

    //this catches the response error
if (!response.ok) {
    throw new Error('Failed to fetch!');
}

    const data = await response.json() as unknown; // await ensures that data will be fulfilled completely
    return data;
};

export {get};