const FetchImage = (imageID: number) => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "Qtw5daIGTJmsha5QLAJJypOYspmxp1Fvr02jsnBNF5nCbUk9IG",
      "X-RapidAPI-Host": "unofficial-cricbuzz.p.rapidapi.com",
    },
  };

  return fetch("https://unofficial-cricbuzz.p.rapidapi.com/get-image?id=" + imageID, options).then((response) => response.blob());
};

const GetAllPromises = (id: any) => {
  const allPromises = Promise.all([FetchImage(id)]);
  return allPromises;
};

export const GetImageFromID = (id: any, callback: any) => {
  GetAllPromises(id).then(([response]) => {
    const fileReaderInstance = new FileReader();
    fileReaderInstance.readAsDataURL(response);
    fileReaderInstance.onload = () => {
      const base64data = fileReaderInstance.result;
      callback(base64data, id);
    };
  });
};

//let image = "https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns=";
