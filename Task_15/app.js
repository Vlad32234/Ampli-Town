$('.spoiler').hide();

$('.spoilerButton').on('click', function () {
  $('.spoilerButton').hide();
  $('.spoiler').slideDown(2000);
});
