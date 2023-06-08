const onRefresh = () => {
  const refreshButton = document.querySelector('.refresh');

  refreshButton.addEventListener('click', () => {
    window.location.reload();
  });
};
export default onRefresh;