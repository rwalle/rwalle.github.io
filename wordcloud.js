var words = [{"text":"Donizetti","url":"","size0":1},{"text":"Verdi","url":"","size0":2},{"text":"Vittorio Grigolo","url":"https://www.vittoriogrigolo.com/","size0":1},{"text":"Beethoven","url":"","size0":1},{"text":"Ravel","url":"","size0":1},{"text":"Wagner","url":"","size0":2},{"text":"Chick Corea","url":"http://chickcorea.com/","size0":1},{"text":"Stravinsky","url":"","size0":1},{"text":"Chopin","url":"","size0":1},{"text":"Mahler","url":"","size0":1},{"text":"Bill Evans","url":"","size0":1},{"text":"Bernstein","url":"https://leonardbernstein.com/","size0":2},{"text":"Ennio Morricone","url":"http://www.enniomorricone.org/","size0":2},{"text":"Gershwin","url":"","size0":1},{"text":"Alexander Calder","url":"","size0":1},{"text":"Mondrian","url":"","size0":2},{"text":"Rembrandt","url":"","size0":2},{"text":"Walker Evans","url":"https://en.wikipedia.org/wiki/Walker_Evans","size0":1},{"text":"Ellsworth Kelly","url":"","size0":2},{"text":"William Marriott Chase","url":"","size0":1},{"text":"Manet","url":"","size0":1},{"text":"Kandinsky","url":"","size0":2},{"text":"John Singer Sargent","url":"","size0":2},{"text":"白先勇","url":"https://zh.wikipedia.org/zh/%E7%99%BD%E5%85%88%E5%8B%87","size0":2},{"text":"Dostoevsky","url":"","size0":1},{"text":"Camus","url":"","size0":2},{"text":"Salinger","url":"","size0":1},{"text":"Maugham","url":"https://en.wikipedia.org/wiki/W._Somerset_Maugham","size0":1},{"text":"Shakespeare","url":"","size0":2},{"text":"Eugene O'Neil","url":"","size0":1},{"text":"Ralph Fiennes","url":"","size0":2},{"text":"Manchester by the sea","url":"","size0":1},{"text":"West Side Story","url":"","size0":2},{"text":"Nuevo Cinema Paradiso","url":"","size0":1},{"text":"Inside Llewyn Davis","url":"","size0":1},{"text":"Jerome Robbins","url":"","size0":1},{"text":"Jeremy Irons","url":"","size0":2},{"text":"La La Land","url":"","size0":2},{"text":"Haley Lu Richardson","url":"https://www.instagram.com/haleyluhoo/","size0":1},{"text":"Sondheim","url":"https://en.wikipedia.org/wiki/Stephen_Sondheim","size0":1},{"text":"Rent","url":"https://en.wikipedia.org/wiki/Rent_(musical)","size0":1},{"text":"Wicked","url":"https://wickedthemusical.com/","size0":3},{"text":"Fun Home","url":"http://funhomebroadway.com/","size0":2},{"text":"Kristin Chenoweth","url":"https://www.officialkristinchenoweth.com/","size0":1},{"text":"Brideshead Revisited","url":"","size0":2},{"text":"Maggie Smith","url":"","size0":1},{"text":"The IT Crowd","url":"","size0":1},{"text":"Esther Smith","url":"https://www.instagram.com/esthervonsmith/","size0":1},{"text":"Colin Firth","url":"","size0":2},{"text":"Downton Abbey","url":"","size0":1},{"text":"WALL-E","url":"","size0":3},{"text":"Ernest & Célestine","url":"http://www.ernestandcelestine.com/","size0":1},{"text":"Frozen","url":"","size0":1},{"text":"Ratatouille","url":"","size0":1},{"text":"bread","url":"","size0":1},{"text":"Python","url":"https://www.python.org/","size0":1},{"text":"New Yorker","url":"https://newyorker.com","size0":1},{"text":"Forza Horizon","url":"","size0":1},{"text":"kindle","url":"","size0":1},{"text":"Disney","url":"","size0":1},{"text":"Pixar","url":"","size0":1},{"text":"The Metropolitan Opera","url":"","size0":1},{"text":"*Click to refresh*","url":"javascript:generateCloud();","size0":3}, {"text":"NPR","url":"https://www.npr.org/","size0":1}, {"text":"Planet Money","url":"https://itunes.apple.com/us/podcast/planet-money/id290783428?mt=2","size0":1}, {"text":"For Good","url":"https://youtu.be/TZ0pXUb5jVU","size0":1}];

var fill = d3.scaleOrdinal(d3.schemeCategory20);
var width = document.getElementById('wordcloud').offsetWidth;
var height = 300;
var fontsize_base = Math.sqrt(width/800) * 20;
for (var i = 0; i < words.length; i++) {
    words[i].size = Math.sqrt(words[i].size0) * fontsize_base + (Math.random() - 0.5) * 5;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function generateCloud() {
    shuffleArray(words);

    width = document.getElementById('wordcloud').offsetWidth;
    fontsize_base = Math.sqrt(width/800) * 16;
    for ( i = 0; i < words.length; i++) {
        words[i].size = Math.sqrt(words[i].size0) * fontsize_base + (Math.random() - 0.5) * 4;
    }
    d3.layout.cloud()
      .size([width, height])
      .words(words)
      .padding(5)
      .rotate(function() { return (Math.random() - 0.5) * 20; })
      .font("Lato")
      .fontSize(function(d) { return d.size;})
      .on("end", draw)
      .start();
}

  
generateCloud();

function draw(words) {

    d3.select("#wordcloud")
      .html("")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate("+ width/2 +","+ height/2 +")")
      .selectAll("text")
      .data(words)
      .enter()
      .append("text")
      .style("font-size", function(d) { return d.size + "px"; })
      .style("font-family", '"Lato", sans-serif')
      .style("fill", function(d, i) { return fill(i);}) //return fill[Math.floor(Math.random()*20)]; })
      .attr("text-anchor", "middle")
      .style("cursor", function(d) {if (d.url) {return "pointer";} else {return "default"}})
      .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; 
      })
      .text(function(d) { return d.text; })
      .on("click", function (d, i){
          if (d.url) {
              if (d.text == '*Click to refresh*')
                  generateCloud();
              else
                  window.open(d.url, "_blank");
          } else {
              return false;
          }
          
      });
}
