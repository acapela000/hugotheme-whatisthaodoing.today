+++
author = "Thao"
title = "My first application: Weather forecast"
emoji = ":sunny:  :umbrella:  :snowflake:  :leaves:  :cloud:"
date = "2023-03-12"
summary = "Web app to check weather forecast at a certain location"
tags = [
    "projects",
    "weather forecast",
    "My first APP",
]
toc = true
thumbnail = "https://cdn.dribbble.com/users/2438406/screenshots/9064361/weatherapp_dribbble_darkmode_v2_2x_4x.png"
+++


## 1. Introduction
**The reason why `weather forecast application` ?**

Hi, I'm a newcomer to the tech field and recently created my first personal project. As someone who is concerned about the weather, I decided to create a web application that provides users with up-to-date weather forecasts to help them prepare for their day.

To build my application, I used Spring Boot to create a RESTful API in Java, Docker to package my application and its dependencies, and PostgreSQL as my database. For the front-end, I used Next.js along with TypeScript and JavaScript, and used Tailwind for CSS styling.

Overall, I'm really proud of the end result - a functional and user-friendly weather forecast application that utilizes a range of powerful and popular tools and technologies.

## 2.Initializing a project
### Creating Spring boot app

I used page [start.spring.io](https://start.spring.io/) and I initialized my app with srpingboot.

{{< figure src="/wf-app/springboot.png" width="100%">}}

All the dependencies I chose from `ADD DEPENDENCIES` will be display on the right of the page. 

{{< figure src="/wf-app/springboot-page.png" width="100%">}}

I used Java programming language so I chose `Gradle - Groovy` for the type of the project. Because 
Gradle is a build automation tool that uses a Groovy-based DSL (Domain-Specific Language) or Kotlin as its build language. It is designed to be highly customizable and supports incremental builds, caching, and parallel execution. Gradle is a good choice for prefering a more flexible build system and wanting to work with a build tool that supports both Groovy and Kotlin. 

*Some brief about the difference between type of projects:*

`Gradle - Groovy`: which uses Gradle as the build tool and Groovy as the primary programming language. Groovy is a dynamic programming language that runs on the Java Virtual Machine (JVM). It is often used for scripting, automation, and testing, and has a syntax similar to Java.

`Gradle - Kotlin`: which uses Gradle as the build tool and Kotlin as the primary programming language. Kotlin is a statically-typed programming language that also runs on the JVM. It is designed to be more concise and expressive than Java, while still maintaining full interoperability with Java code.

`Maven`: is also a popular build tool for Java-based projects. Using Maven as the build tool, which is an older build automation tool compared to Gradle. Maven is XML-based project configuration file to manage dependencies, build steps, and other project-related settings, following a "convention over configuration" approach. This means that it has a set of pre-defined conventions and best practices to simplify the build process.

{{< figure src="/wf-app/springboot-project-types.png" width="100%">}}

There are lots of dependencies we can choose from the list. But at the time initializing the app, I only need `Spring wed` dependency so I chose it.

{{< figure src="/wf-app/springboot-dependency.png" width="100%">}}

I clicked on generate button and then I have an app written in Java. The good point about this site is that it automatically creates a folder in the place we want to store all the information/data base about the app.

{{< figure src="/wf-app/springboot-generate.png" width="100%">}}

I opened the project's folder in IntelliJ and went to `build.gradle` to check the dependency I chose and it will be:

```java
dependencies {
	implementation 'org.springframework.boot:spring-boot-starter-web'
	testImplementation 'org.springframework.boot:spring-boot-starter-test'
}
```

## 3.Back-end development

After initialize the app successfully, I started to write the server-side code that powers my web app. Here at the `back-end` I'll choose a database to store my data, and write code to handle user authentication, server-side rendering, and any other functionality required by my app. 

### Installing dependencies

In order to use annotation: `@JsonSerialize` and `@JsonDeserialize`, I installed the `jackson` dependency from [maven repository](https://mvnrepository.com/).

{{< figure src="/wf-app/jackson-databind.png" width="100%">}}

I chose the latest version `jackson '2.14.2'`

{{< figure src="/wf-app/jackson-version.png" width="100%">}} 

After downloaded with `Gradle (short)`([why gradle short?]()), once again I went to check the dependency at `build.gradle`.

{{< figure src="/wf-app/jackson-download.png" width="100%">}} 

In order to manage and easier to update the versions of any dependencies, I made a variable `jacksonVersion` for each of the dependency and pass the parameter `${jacksonVersion}`.

```java
var jacksonVersion = "2.14.2"
var swaggerVersion = "3.0.0"
var lombokVersion = "1.18.26"
var postgreSQLVersion = "42.5.4"
```
So that when needed to update the version, I just need to update the variable. It helps me save more time to look for where the dependency locate:smirk: among lots of other dependencies:fearful::sweat: like below for example.

[My github's link of dependencies](https://github.com/acapela000/WeatherForecastAPI/blob/basic-sql/build.gradle)

```java
dependencies {

	implementation 'org.springframework.boot:spring-boot-starter-web'
	testImplementation 'org.springframework.boot:spring-boot-starter-test'

	// https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-databind
	//to serialize and deserialize json
	implementation "com.fasterxml.jackson.core:jackson-databind:${jacksonVersion}"

	// https://mvnrepository.com/artifact/io.springfox/springfox-boot-starter
	implementation "io.springfox:springfox-boot-starter:${swaggerVersion}"
	// https://mvnrepository.com/artifact/io.springfox/springfox-swagger-ui
	implementation "io.springfox:springfox-swagger-ui:${swaggerVersion}"

 	//	implementation 'org.springframework.boot:spring-boot-starter-oauth2-resource-server'

	// https://mvnrepository.com/artifact/org.projectlombok/lombok
	compileOnly "org.projectlombok:lombok:${lombokVersion}"
	annotationProcessor "org.projectlombok:lombok:${lombokVersion}"

	//to connect to database
	// https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-data-jpa
	implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
	// https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-data-rest
	implementation 'org.springframework.boot:spring-boot-starter-data-rest'
	// https://mvnrepository.com/artifact/org.postgresql/postgresql
	implementation "org.postgresql:postgresql:${postgreSQLVersion}"
}
```
### Model
I made `model` with attributes: `temperature`, `humidity`, `precipitation`, `condition`, `city`, `date`. And following the rule of Java, I created `constructor` with `getter` and `setter`. I'm using annotation `JsonSerialize` and `JsonProperty`.

- `JsonSerialize`: 
- `JsonProperty`:

```java
@JsonSerialize
public class WeatherForecast {

    @JsonProperty
    private double temperature;
    @JsonProperty
    private double humidity;
    @JsonProperty
    private boolean precipitation;
    @JsonProperty
    private String condition;
    @JsonProperty
    private String city;
    @JsonProperty
    private Timestamp date;

    public WeatherForecast() {
    }

    public WeatherForecast(double temperature, double humidity, boolean precipitation, String condition, String city) {
        this(temperature, humidity, precipitation, condition, city, new Timestamp(new Date().getTime()));
    }

    public WeatherForecast(double temperature, double humidity, boolean precipitation, String condition, String city, Timestamp date) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.precipitation = precipitation;
        this.condition = condition;
        this.city = city;
        this.date = date;
    }

	//getter and setter
}
```
Here, in the second `constructor` I use `new Timestamp(new Date().getTime())` to get the current day.

```java
public WeatherForecast(double temperature, double humidity, boolean precipitation, String condition, String city) {
        this(temperature, humidity, precipitation, condition, city, new Timestamp(new Date().getTime()));
    }
```

And in the third constructor I pass all the attributes:

```java
public WeatherForecast(double temperature, double humidity, boolean precipitation, String condition, String city, Timestamp date) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.precipitation = precipitation;
        this.condition = condition;
        this.city = city;
        this.date = date;
    }
```

### Controller

I follow the structure of MVC Springboot so that at first I create `controller` call `Health-check`. I use this class to check the status of the `API`.

```java
@RestController
public class HealthCheck {

    @RequestMapping(value = "/health-check", method = RequestMethod.GET)
    public String checkSttOfAPI() {
        return "OK";
    }
}
```

If I run the url `localhost:8080` with the `endpoint` is the value `/health-check` I can check the api is working or not. If it works, it will return the message `OK`. 

{{< figure src="/wf-app/health-check-OK.png" width="100%">}}

Or else, it returns `Can't get the method`

{{< figure src="/wf-app/.png" width="100%">}}

**SWAGGER**

[Why we need `Swagger`?]()

In order to use `Swagger`, I started to set up the dependency first.

```java
var swaggerVersion = "3.0.0"

repositories {
	// https://mvnrepository.com/artifact/io.springfox/springfox-boot-starter
	implementation "io.springfox:springfox-boot-starter:${swaggerVersion}"
	// https://mvnrepository.com/artifact/io.springfox/springfox-swagger-ui
	implementation "io.springfox:springfox-swagger-ui:${swaggerVersion}"
}
```

`ResponseEntity` is used in Spring MVC as the return value from an @Controller method.

[ResponseEntity Docs](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/http/ResponseEntity.html)

`@Controller` and `@RequestMapping` annotations to define an HTTP endpoint for managing inventory items

what is the difference between gradle and gradle (short) 

Before using Swagger, I reccommend using `Insomnia` to check for the status of local server.

[Download Insomnia for Windows](https://insomnia.rest/download) 

{{< figure src="/wf-app/health-check-insomnia.png" width="100%">}}

I create an `GET` method and send the url `http://localhost:8080/health-check`. Insomnia return the `200` status, means the api is working.

If it doesn't work, we need to first: check the internet connection, then check ???

**More content is uploading...**

## 4.Front-end development
Once you have the back-end code in place, you'll need to create the user interface for your web app. This involves designing the layout and visual elements of your app using HTML, CSS, and JavaScript. You may want to use a front-end framework like React or Vue.js to simplify the process.

{{< figure src="/wf-app/frontend-ontheway.png" width="100%">}}

**More content is uploading...**

## 5.Testing - Deployment
Once your web app is complete, it's important to test it thoroughly to ensure it works as intended. This includes functional testing, integration testing, and performance testing. Once you're satisfied with the results, you can deploy your web app to a production environment, either on your own server or using a cloud hosting service like AWS or Heroku.

**More content is uploading...**

## 6.Maintenance and updates, utilities
Once your web app is live, it's important to monitor its performance, fix any bugs that arise, and add new features as needed. You may also want to consider integrating analytics tools to track user behavior and improve the user experience over time.

Coding tool:
- IntelliJ
- Visual studio code

**More content is uploading...**