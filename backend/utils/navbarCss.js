header {
  background-color: var(--primary);
  padding-right: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header img {
  width:120px;
  height: 120px;
}

header .fixed {
  position: fixed;
  inset: 0;
  background-color: var(--secondary);
  z-index: 2;
}

@keyframes myMove {
  0% {scale:0;}
  60% {scale: 1.2;}
  100%{scale:1;}
}
header .fixed ul.modal {
animation: myMove 0.5s 1; 
 width: 100%;
 margin-left: auto;
 margin-right: auto;
 padding: 1rem 2rem;
 background-color: #3d3b3ad0;
}
header .fixed ul.modal li{
border-bottom: 1px solid var(--secondary);
padding-bottom: 0.5rem;
padding-top: rem;
}

header .fixed ul.modal li:last-child{border: none;}

header .fixed ul.modal li a {
  font-size: 1.5rem;
  color:var(--primary)
}

header .fixed ul.modal li:first-child{
   text-align: right;
   border: none;
   padding-bottom: 0;
   padding-top: 0.2rem;
  }
 
button{ all: unset;}

header .fixed ul.modal li:not(:first-child):hover {
  background-color: var(--secondary);
}

header .fixed ul.modal li a:hover {

  color:var(--title)
}
