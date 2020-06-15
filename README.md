# Shreddr

### Shreddr
Shreddr is a web application that recommends workouts based on the equipment you have.

## Background and Overview 
Because of COVID-19 related quarantines throughout the world, gyms are closed and people have had to rely on workouts at home to stay fit. Shreddr’s goal is to provide workout options to people with limited exercise equipment. It will maintain a database of exercises that users can use to generate workouts based on their fitness goals and the equipment that they have available. Users will also be able to keep track of their progress, such as bodyweight and lifts.

## Functionality and MVP List

**1. Profiles**
- [ ] Logged in users can edit their profile, track workouts, and upload progress photos.
- [ ] Logged in users can edit their profile privacy.

**2. Workout Generator**
- [ ] Users can filter workouts by available equipment.
- [ ] Users can access fitness and workout tips. 

**3. Progress Tracker**
- [ ] Logged in users can track their body weight.
- [ ] Logged in users can visualize their progress in graphs. 

**4. Outdoor Gym/ Park Finder**
- [ ] Users can search for the nearest gyms and parks. 

**Bonus**
- [ ] Forum

## Technologies and Technical Challenges

**Workout Generator**
* We will maintain a database containing data about exercises, such as equipment needed, muscle groups targeted, and difficulty level.  Users can specify the equipment that they have access to as well as their skill level, and Shreddr will recommend a balanced workout routine according to their individual fitness goals.

**Amazon Web Services**
* Users can upload private or public progress pictures and attach them to their profile.

**Google Maps API**
* Users can search for nearby outdoor gyms and parks, and workouts can be generated based on the equipment available there.

## Group Members and Work Breakdown

**Jae-Son Song** - team lead
**Tiffany Chin** - front end
**Eric Lee** - back end
**Jesse Lin** - flex

### Day 1
* Back end auth - Eric, Jae-Son
* Front end auth - Tiffany, Jesse
* Workout database - Eric, Jae-Son

### Day 2
* Back end user profiles - Eric, Jae-Son
* AWS - Eric, Jae-Son
* Splash page, front end user profiles - Tiffany, Jesse

### Day 3
* Workout generator back end - Eric, Jae-Son
    * Logic for filtering workouts
* Workout generator front end - Tiffany, Jesse

### Day 4
* Gym finder backend - Eric, Jae-Son
* Gym finder frontend - Tiffany, Jesse
* Production README
* Finish testing and debugging

