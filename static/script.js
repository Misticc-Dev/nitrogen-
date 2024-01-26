const form = document.getElementById('adrbar');
const input = document.querySelector('input');

const ts = new TabSystem({
  btnTemplate: $("#tabTemplate"),
  tabTemplate: $("#frameTemplate"),
  tabBtnContainer: $("#tabContainer"),
  tabContainer: $("#frameContainer"),
  URLBar: $("#adrbar")
})
  
function $(query) {
  return document.querySelector(query)
}
  
const offset = "37px" // incompetent code
  
function updateTabLengths() {
  console.log(ts.getTabCount())
  if (ts.getTabCount() > 8) {
    for (i = 0; i < ts.getTabCount(); i++) {
      ts.getTabs()[i].getConnectedElement().style.width = "calc(" + (100 / ts.getTabCount()).toString() + "%" + " - " + offset + " )"
    }
  } else {
      for (i = 0; i < ts.getTabCount(); i++) {
        ts.getTabs()[i].getConnectedElement().style.width
    }
  }  
}
  
function newTab(){
  ts.setActiveTab(ts.addTab(new Tab(ts.createTabBtn(), ts.createTabFrame())))
  updateTabLengths()
}
  
function closeTab(){
  ts.deleteTab(ts.getActiveTab(), true)
  updateTabLengths()
}
  
  
$("#addtab").addEventListener("click", () => {
  newTab()
})

$("#closetab").addEventListener("click", () => {
  closeTab()
})
  
$("#tabContainer").addEventListener(
  "wheel",
  (evt) => {
    evt.preventDefault();
    if (evt.deltaY >= -15 && evt.deltaY <= 15) {
      $("#tabContainer").scrollLeft += evt.deltaY * 40;
    } else {
      $("#tabContainer").scrollLeft += evt.deltaY * 5;
    }
  },
  { passive: false }
);
  
window.onload = function() {
  newTab();
};
