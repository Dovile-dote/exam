export const login = (key) => {
  // console.log(key);
  localStorage.setItem('session', key);
};
export const logout = () => {
  localStorage.removeItem('session');
};
export const authConfig = () => {
  return {
    headers: {
      Authorization: `${localStorage.getItem('session') ?? ''}`,
    },
  };
  // jeigu nori duomenu is duombazes, tai back'e (arba ir front'e) prie visu
  // kreipimusi i serveri (  axios.get('http://adresas', authConfig())  )
  // reik ideti ir i delete ir read/create ir dar susiimportuoti nepamirst virsuj
};
