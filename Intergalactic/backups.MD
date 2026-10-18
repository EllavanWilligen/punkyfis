```
Intergalactic planetary, planetary intergalactic <br>
Intergalactic planetary, planetary intergalactic<br>
Intergalactic planetary, planetary intergalactic<br>
Intergalactic planetary, planetary intergalactic<br>
```
```
        Another dimension, another dimension<br>
        Another dimension, another dimension<br>
        Another dimension, another dimension<br>
        Another dimension, another dimension<br>
        Another dimension, another dimension<br>
        Another dimension, another dimension<br>
```


Section 1 en 2 zijn hetzelfde wb inhoud als section 19 en 20
VRESELIJK lettertype voor mijn idee

Source - https://stackoverflow.com/a/30291942 

```   <p id="playStatus" role="status" aria-live="polite"></p> ```

```
#playStatus {
  flex-basis: 100%;
  margin: 0;
  text-align: center;
  color: #b00020;
}
```


body:not(.is-locked) zodat de animatie pas begint als er op een knop is gedrukt in het beginscherm




Source: https://css-tricks.com/snippets/css/typewriter-effect/
.typewriter h1 {
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: .15em solid orange; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  letter-spacing: .15em; /* Adjust as needed */
  animation: 
    typing 3.5s steps(40, end),
    blink-caret .75s step-end infinite;
}

/* The typing effect */
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: orange; }
}



body:not(.is-locked) section:nth-of-type(3) {
  color: yellow;
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  letter-spacing: .15em; /* Adjust as needed */
  animation: typing 3s steps(40, end);
}

body:not(.is-locked) section:nth-of-type(3) p:nth-child(1) { animation-delay: 18s; }
body:not(.is-locked) section:nth-of-type(3) p:nth-child(2) { animation-delay: 18s; }
body:not(.is-locked) section:nth-of-type(3) p:nth-child(3) { animation-delay: 18s; }
body:not(.is-locked) section:nth-of-type(3) p:nth-child(4) { animation-delay: 18s; }


```
body:not(.is-locked) article>section:nth-of-type(3) p {
  overflow: hidden;
  white-space: nowrap;
  width: 0;
  animation: typing 4s steps(40, end) forwards;
}

body:not(.is-locked) article>section:nth-of-type(3) p:nth-child(1) {
  animation-delay: 30s;
}

body:not(.is-locked) article>section:nth-of-type(3) p:nth-child(2) {
  animation-delay: 32s;
}

body:not(.is-locked) article>section:nth-of-type(3) p:nth-child(3) {
  animation-delay: 34s;
}

body:not(.is-locked) article>section:nth-of-type(3) p:nth-child(4) {
  animation-delay: 36s;
}
```

```      
<section>
        <p>Well, now, don't you tell me to <strong>smile</strong></p>
        <p>You stick around, I'll make it worth your <strong>while</strong></p>
        <p>Got numbers beyond what you can <strong>dial</strong></p>
        <p>Maybe it's because I'm so versa<strong>tile</strong></p>
</section>
```

```
body:not(.is-locked) article > section:nth-of-type(-n+3) {
  animation: weg 0s linear 40s forwards;
}
```