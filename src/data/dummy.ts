const COUNT = 50

export const dummyData = async () => {
  const randomUsers = await Promise.all(
    Array.from({ length: COUNT }, () => {
      return fetch("https://api.3geonames.org/.json?randomland=yes")
        .then((res) => res.json())
        .then((data) => {
          return {
            lat: parseFloat(data.nearest.latt),
            lng: parseFloat(data.nearest.longt),
            name: data.major.city,
          };
        }).catch((err) => {
          console.log(err)
        });
    })
  );

  const filteredUsers = randomUsers.filter((user) => user && user.name && user.lat && user.lng) as {
    name: string,
    lat: number,
    lng: number
  }[];

  return {
    shippers: filteredUsers.slice(0, (filteredUsers.length-1)/2).map((user) => {
      return {
        id: user.name,
        name: user.name,
        location: [user.lng, user.lat],
      };
    }),
    consignees: filteredUsers.slice(filteredUsers.length/2, filteredUsers.length-1 ).map((user) => {
      return {
        id: user.name,
        name: user.name,
        location: [user.lng, user.lat],
      };
    }),

    routes: filteredUsers.slice(0, (filteredUsers.length/2)).map((user, i) => {
      return {
        id: user.name,
        coordinates: [
          [user.lng, user.lat],
          [randomUsers[i + (filteredUsers.length/2) -1]?.lng, randomUsers[i + (filteredUsers.length/2)-1]?.lat],
        ],
      };
    }),
  };
};
