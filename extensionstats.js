import $ from "https://esm.sh/jquery";

$('.extension-usage[data-extension]').each(function() {
    const extension = $(this).attr("data-extension");
    const url = `https://meta.miraheze.org/w/api.php?action=expandtemplates&format=json&smaxage=21600&maxage=21600&text=%7B%7BNUMBEROFWIKISUSINGEXTENSION%3A%20${extension}%7D%7D&prop=wikitext&formatversion=2&origin=*`;
  
  const element = $(this);
  
  $.getJSON(url, function ( data ) {
    element.text(data.expandtemplates.wikitext);
  });
});

