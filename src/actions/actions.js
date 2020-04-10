export const ADD = "ADD";
export const COMPRESS = "COMPRESS";

export const photoCompressFetch = formData => {
  return dispatch => {
    dispatch(compressImage());
    return fetch("https://backend.tinierpng.com/api/photo", {
      method: "POST",
      body: formData,
      credentials: "include"
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        dispatch(addCompressed(data));
        // console.log(data);
      })

      .catch(error => {
        console.log(error);
      });
  };
};

export const photoDownloadFetch = data => {
  return dispatch => {
    const filename = data;
    console.log(filename);
    return fetch(`https://backend.tinierpng.com/api/download/${filename}`, {
      method: "GET",
      credentials: "include"
    })
      .then(response => {
        // console.log(response);
        if (response.ok) {
          window.open(`${response.url}`, `_self`);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const addCompressed = data => {
  return {
    type: ADD,
    data: data
  };
};

export const compressImage = () => {
  return {
    type: COMPRESS
  };
};
