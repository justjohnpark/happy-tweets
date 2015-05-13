mood-based, not practical

issues:
  - Twitter API Endpoint w/o user-specific tweets left the search/tweets.json endpoint. The only way to filter for geocoded tweets was to specify a coordinate with a radius, which may be why the tweets seem to be concentrated in a certain region
  - 
  - keeping in mind processing concerns, i wanted to use the google static maps api, but with this api, everything was done through links, which meant an api call for each individual marker. i could've built my own marker placing system (translating longitude and latitude into specific pixels on a static image independent of google) but i wanted this to be a last resort
  -
  - wasted time on d3 and a bunch of other mapping frameworks built by other people. i chose to go with the google maps javascript api 
  -
  - the sequence of smiley faces coming on/off the map is done with timers, one for putting them on and two for putting them off. having the on/off overlap (i didn't want the new set to only come in when the old ones were completely off the map) and the timers for the off sequence being nested was a bit tricky to synchronize. terry and i talked about another way to do this, which i think i'll implement because while all this works, it feels a bit like a glass castle
  -
  - there are two sets of data here, so that while one is being loaded onto the map, the other one is ready to go as soon as the previous one is done. i had this issue where a new twitter call would give back the same tweets as the previous call. while trying to solve this issue, i discovered that caching was a problem and that i had slight misunderstanding of what asynchronous functions look like. 


for next week:
  - after messing around with the emulator for a day, i thought it'd be best to build up a working version of the idea using the tools i know and only then putting in efforts to transplant it into the emulator. this took a while longer than i anticipated.
  
  - also, some testing. 