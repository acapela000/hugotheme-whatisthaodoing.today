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
### Creating Spring Boot app

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

### Check API's status

What is API health check? 

It is a Rest(ful) API endpoint that checks the API itself and all critical dependencies. API health check endpoint returns the check result as the response. Software, QA, and Dev-ops teams use this endpoint to monitor the health of an API using a monitoring tool like Testfully.
Following that at first I created `controller` call `Health-check`. I use this class to check the status of the `API`.

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

[More about health-check](https://testfully.io/blog/api-health-check-monitoring/)
[Reference: Health-check with Cloud Foundary](https://docs.cloudfoundry.org/devguide/deploy-apps/healthchecks.html)

## 3.Back-end development

After initialize the app successfully, I started to write the server-side code that powers my web app. Here at the `back-end` I'll choose a database to store my data, and write code to handle user authentication, server-side rendering, and any other functionality required by my app. 

### Stage 1: Installing dependencies

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

### Stage 2: Basic model, controller, repository
- Create `model`: `WeatherForecast`
- Create `controller`: `GetForecast`
- Create `repository`: `Database` and `Memorydatabase`

{{< figure src="/wf-app/structure-1.png" width="50%">}} 

**MODEL**

**WeatherForecast**

I made `model` called `WeatherForecast` with attributes: `temperature`, `humidity`, `precipitation`, `condition`, `city`, `date`. And following the rule of Java, I created `constructor` with `getter` and `setter`. I'm using annotation `JsonSerialize` and `JsonProperty`.

- `JsonSerialize`: to convert an object to stream that we can send over the network or save it as file or store in database for later usage (from Java object into Json format).
- `JsonDeserialize`:  to reconstruct an object stream from the serialized form to actual Java object(from Json format into Java object).
- `JsonProperty`: be used to map property names with Json keys during serialization and deserialization.

```java
// https://github.com/acapela000/WeatherForecastAPI/blob/f7e5eeb8accad05c2a6df6d237fbf452031c467a/src/main/java/com/charlieThao/weather_forcast_demo/model/WeatherForecast.java

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

    // getter & setter
}

```

Here, in the second `constructor` I use `new Timestamp(new Date().getTime())` to get the current date and time.

```java
public WeatherForecast(double temperature, double humidity, boolean precipitation, String condition, String city) {
        this(temperature, humidity, precipitation, condition, city, new Timestamp(new Date().getTime()));
    }

```

And in the third constructor I pass all the attributes and set up the value for each attributes:

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

**CONTROLLER**

I created `GetForecast` class using annotation `@RestController` to specify this is `controller` and using `RequestMapping` to specify the `endpoint` by `/forecast`. 

```java
@RestController
@RequestMapping("/forecast")
public class GetForecast { 
    // full code 
    // https://github.com/acapela000/WeatherForecastAPI/blob/f7e5eeb8accad05c2a6df6d237fbf452031c467a/src/main/java/com/charlieThao/weather_forcast_demo/controller/GetForecast.java
}
```

Because class `MemoryDatabase` implement from interface `Database` so I created a new object of `MemoryDatabase` to connect with the database:

```java
Database db = new MemoryDatabase();

```

Continously, using annotation `@RequestMapping` to specify the `endpoint` by `/today/{city}` with the method is `GET` and type of format is `JSON` through `produces`. The `url` at this time will be `http://localhost:3000/forcast/today/{city}`.

- `@RequestMapping`: for mapping web requests onto methods in request-handling classes with flexible method signatures.
- `produces`: Narrows the primary mapping by media types that can be produced by the mapped handler.
- `value`: The primary mapping expressed by this annotation.

[More about Annotation Interface RequestMapping](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/bind/annotation/RequestMapping.html)

```java
@RequestMapping (
            value = "/today/{city}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )

```

As you can see in the class, I'm using `getToday` in order to get the weather forecast on that day. By passing the variable `city` to the endpoint. If the program can not find any `weatherForecast` on that day, means that it's `null` then the program will return `not found` through function `notFound()`. Else, it returns that `weatherForecast` through function `ok()`.

- `ResponseEntity`: representing the whole HTTP response: status code, headers, and body. As a result, we can use it to fully configure the HTTP response.
- `notFound()`: Create a builder with a NOT_FOUND status.
- `ok(body)`: A shortcut for creating a ResponseEntity with the given body and the status set to OK.

[More about ResponseEntity](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/http/ResponseEntity.html)

```java
public ResponseEntity<WeatherForecast> getToday(@PathVariable("city") String city) {
        WeatherForecast weatherForecast = db.getWF(city);
        if (weatherForecast == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(weatherForecast);
    }

```

I'm using annotation `@RequestMapping` to specify the `endpoint` by `/week/{city}` with the method is `GET` and type of format is `JSON` through `produces`. The `url` at this time will be `http://localhost:3000/forcast/week/{city}`.

```java
@RequestMapping (
            value = "/week/{city}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)

```

And then, I created a list of `forecast` by using  `ResponseEntity<List<WeatherForecast>>` for a `week` with function `getWeek`. With `@PathVariable`, I passed the varaiable `city` to the `url`. The method `getWeek` will return `null` when there is no weather forecast in a day being found.

```java
    public ResponseEntity<List<WeatherForecast>> getWeek(@PathVariable("city") String city) {
        return null;
    }

```

**REPOSITORY**

**Database**

In order to let the other class implement the method, I created the interface `Database` with 4 abstract methods: `createWF`, `updateWF`, `getWF`, `deleteWF` (WF means Weather Forecast) and pass needed variable for each of it. 

```java
// https://github.com/acapela000/WeatherForecastAPI/blob/f7e5eeb8accad05c2a6df6d237fbf452031c467a/src/main/java/com/charlieThao/weather_forcast_demo/repository/Database.java

public interface Database {

    public boolean createWF(String city, WeatherForecast weatherForecast);

    public WeatherForecast updateWF(String city, WeatherForecast wf);

    public WeatherForecast getWF(String city);

    public boolean deleteWF(String city);
}

```

**MemoryDatabase**

I created some mock-data by using `hashmap` with the `key` is a `string` and the `value` is a `weather forecast`.

```java
public HashMap<String, WeatherForecast> weatherForecastList = new HashMap<String, WeatherForecast>() {
        {
            put("New York", new WeatherForecast(26.0, 25.0, false, "cloudy", "New York"));
            put("Melbourn", new WeatherForecast(29.0, 20.0, true, "snowy", "Melbourn"));
        }
    };

```

The `MemoryDatabase` implement the `Database` so that it inherit all the method. I use annotation `@Override` to rewrite those methods as well as implement in details. The method `createWF` will return a `boolean` value `true` or `false`. If in the list `weatherForecastList` doesn't contain the `key` `city` that the we wanna create, it will put that `city` in the list and inform the user `true` or else `false`. For the `getWF` to display the list `weatherForecastList` by using function `get()` with the parameter `city`.

```java
public class MemoryDatabase implements Database {

    @Override
    public boolean createWF(String city, WeatherForecast wf) {
       if (!weatherForecastList.containsKey(city)) {
           weatherForecastList.put(city, wf);
           return true;
       }
        return false;
    }


    @Override
    public WeatherForecast getWF(String city) {
        return weatherForecastList.get(city);
    }

    // update and delete method
    // https://github.com/acapela000/WeatherForecastAPI/blob/f7e5eeb8accad05c2a6df6d237fbf452031c467a/src/main/java/com/charlieThao/weather_forcast_demo/repository/MemoryDatabase.java
}

```

### Stage 3: Configurate Swagger

**[Why we need `Swagger`?]()**

Swagger helps users build, document, test and consume RESTful web services. It provides a user interface to access our RESTful web services via the web browser.

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
**Configurate Swagger with the code**

I created class `SwaggerConfiguration` at `main/java...` to set up Swagger.

{{< figure src="/wf-app/swagger-structure.png" width="100%">}}

**Custom Information**

Swagger also provides some default values in its response, which we can customize, such as “Api Documentation”, “Created by Contact Email”, and “Apache 2.0”.

To change these values, we can use the apiInfo(ApiInfo apiInfo) method — the ApiInfo class that contains custom information about the API:

```java
// https://github.com/acapela000/WeatherForecastAPI/commit/82e648a11596856fa43a65bb41b9e66005ee5a6d

@Configuration
@EnableWebMvc
public class SwaggerConfiguration {
    private ApiInfo getInfo() {
        return new ApiInfo(
                "WeatherForecastAPI",
                "This is the API for weather forecast",
                "0.0.1",
                " ",
                new Contact("Charlie Thao", "https://github.com/acapela000/WeatherForecastAPI", "google@gmail.com"),
                "MIT",
                "https://github.com/acapela000/WeatherForecastAPI/blob/main/LICENSE.md",
                "https://github.com/acapela000/WeatherForecastAPI/blob/master/LICENSE.md",
                Collections.emptyList()
        );
    }
}

```

**Advanced Configuration**

The `Docket`` bean of our application can be configured to give us more control over the API documentation generation process.

Filtering API for Swagger’s Response:

It is not always desirable to expose the documentation for the entire API. We can restrict Swagger’s response by passing parameters to the `apis()` and `paths()` methods of the `Docket` class.

As seen above, RequestHandlerSelectors allows using the any or none predicates but can also be used to filter the API according to the base package, class annotation, and method annotations.

`PathSelectors` provides additional filtering with predicates, which scan the request paths of our application. We can use `any()`, `none()`, `regex()`, or `ant()`.

<!-- In the example below, we will instruct Swagger to include only controllers from a particular package, with specific paths, using the `ant()` predicate: 
```java
@Bean
public Docket api() {                
    return new Docket(DocumentationType.SWAGGER_2)          
      .select()                                       
      .apis(RequestHandlerSelectors.basePackage("com.baeldung.web.controller"))
      .paths(PathSelectors.ant("/foos/*"))                     
      .build();
}
```
-->

```java
@Bean
    public Docket swaggerAPI() {
        return new Docket(DocumentationType.OAS_30)
                .apiInfo(getInfo())
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
                .build();
    }

```
While set up Swagger I conpacted some error with the `url`. I tried some `url` below:

- `http://localhost:8080/swagger-ui/index.html#/`
- `http://localhost:8080/swagger-ui/`

[References: Most common errors when setting up Swagger](https://docs.bmc.com/docs/ars2105/troubleshooting-issues-when-using-swagger-as-a-rest-api-client-1002225210.html)


### Stage 4: Add MIT License

**Why need MIT License**

Users of software using an MIT License are permitted to use, copy, modify, merge publish, distribute, sublicense and sell copies of the software.

[More about MIT License](https://opensource.org/license/mit/)

**Find official document on Github**

Google search for `MIT License Github`, choose the `documents`

{{< figure src="/wf-app/MIT-license-search.png" width="100%">}} 

Go to `chooselicense`

{{< figure src="/wf-app/MIT-license-docs.png" width="100%">}}

and click to `MIT license`

{{< figure src="/wf-app/choose-MIT-license.png" width="100%">}}

And then I copied the text and put my name on that.

[MIT License Text](https://choosealicense.com/licenses/mit/)

{{< figure src="/wf-app/MIT-license-text.png" width="100%">}}

**Set up the MIT License with the code**

At the program, I created file `LICENSE.md` and pasted the editted text with my name on to that file.

{{< figure src="/wf-app/license-md.png" width="40%">}}

Then I went to Swagger to check how MIT License's information displayed. 

{{< figure src="/wf-app/MIT-swagger.png" width="100%">}}

### Stage 5: Configurate PostgreSQL

**User**

```java
// https://github.com/acapela000/WeatherForecastAPI/commit/57b18545a405de753f26c1e55e32a7a20626f2c4#diff-66e79c2cdb9217fa84b823cfa3cc4fc49329420dec99f0cdc25899108b9752a6

@JsonSerialize
public class User {

    @JsonProperty
    private boolean isAdmin;
    @JsonProperty
    private String userName;
    @JsonProperty
    private String password;
    @JsonProperty
    private Date dateOfBirth;
    @JsonProperty
    private String email;
    @JsonProperty
    private String phoneNumber;
    @JsonProperty
    private String address;
    private String idNumber;
    private String idAccount;

    private final List<WeatherForecast> weatherForecastList = new ArrayList<>();

    public User() {
    }

    public User(
        boolean isAdmin, String userName, String password, Date dateOfBirth,
        String email, String phoneNumber, String address, String idNumber) {
            boolean isAdmin, String userName, String password, Date dateOfBirth,
            String email, String phoneNumber, String address, String idNumber) {
        this.isAdmin = isAdmin;
        this.userName = userName;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.idNumber = idNumber;
        this.idAccount = idNumber;
    }




    public boolean isAdmin() {
        return isAdmin;
    }
    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }
    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
@@ -69,32 +83,32 @@
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPhoneNumber() {
        return phoneNumber;
    }
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }

    public String getIdNumber() {
        return idNumber;
    public String getIdAccount() {
        return idAccount;
    }

    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    public void setIdAccount(String idAccount) {
        this.idAccount = idAccount;
    }

    public List<WeatherForecast> getWeatherForecastList() {
        return weatherForecastList;
    }
}
}
```

**CONTROLLER**

**Forecast**

```java
// https://github.com/acapela000/WeatherForecastAPI/blob/basic-sql/src/main/java/com/charlieThao/weather_forcast_demo/controller/Forecast.java

@RestController
@RequestMapping("/forecast")
public class Forecast {
private WFDatabase db = new WFMemoryDatabase();

    @RequestMapping (
            value = "/today/{city}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<WeatherForecast> getToday(@PathVariable("city") String city) {
        WeatherForecast weatherForecast = db.getWF(city);
        if (weatherForecast == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(weatherForecast);
    }

    @RequestMapping (
            value = "/week",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<WeatherForecast>> getWeek() {
        List<WeatherForecast> wfList = db.getListOfWF("", 7);
        if (wfList.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(wfList);
    }

    @RequestMapping(
            value = "/{city}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseMsg> deleteWFToday(@PathVariable("city") String city) {
        boolean isDeleted = db.deleteWF(city);
        if (isDeleted) {
            return ResponseEntity.ok(new ResponseMsg("Delete successfully!"));
        }
        return ResponseEntity.notFound().build();
    }

    @RequestMapping(
            value = "/{city}",
            method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<ResponseMsg> createWFToday(@PathVariable("city") String city,
                                                     @RequestBody WeatherForecast wf) {
        boolean created = db.createWF(city, wf);
        if (created) {
            return ResponseEntity.ok(new ResponseMsg("Created successfully!"));
        }
        return ResponseEntity.badRequest().build();
    }

    @RequestMapping(
            value = "/{city}",
            method = RequestMethod.PUT,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<WeatherForecast> updateWFToday(@PathVariable("city") String city,
                                                         @RequestBody WeatherForecast wf) {
        WeatherForecast weatherForecast = db.updateWF(city, wf);
        if (weatherForecast != null) {
            return ResponseEntity.ok(weatherForecast);
        }
        return ResponseEntity.notFound().build();
    }

}
```

**User**

```java

@RestController
@RequestMapping("/user")
public class UserController {

private UserDatabaseInterface userdb = new UserMemoryDatabase();

@RequestMapping(
        value = "/create",
        method = RequestMethod.POST,
        consumes = MediaType.APPLICATION_JSON_VALUE,
        produces = MediaType.APPLICATION_JSON_VALUE)
public ResponseEntity<ResponseMsg> createUserAcc(@RequestBody User user) {
    String unique = UUID.randomUUID().toString();
    user.setIdAccount(unique);
    boolean created = userdb.creatUser(unique, user);
    if (created) {
        return ResponseEntity.ok(new ResponseMsg("User account is created successfully!"));
    }
    return ResponseEntity.notFound().build();
}

@RequestMapping(
        value = "/delete/{idAccount}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
public ResponseEntity<ResponseMsg> deleteUserAcc(@PathVariable("idAccount") String idAccount) {
    boolean deleted = userdb.deleteUser(idAccount);
    if (deleted) {
        return ResponseEntity.ok(new ResponseMsg("Deleted successfully!"));
    }
    return ResponseEntity.notFound().build();
}

@RequestMapping(
        value = "/update/{idAccount}",
        method = RequestMethod.PUT,
        consumes = MediaType.APPLICATION_JSON_VALUE,
        produces = MediaType.APPLICATION_JSON_VALUE)
public ResponseEntity<User> updateUserAcc(@PathVariable String idAccount, @RequestBody User user) {
    User us = userdb.updateUser(idAccount, user);
    if (us != null) {
        return ResponseEntity.ok(us);
    }
    return ResponseEntity.badRequest().build();
}

@RequestMapping(
        value = "/{idAccount}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
public ResponseEntity<User> getUserAcc(@PathVariable("idAccount") String idAccount) {
    User us = userdb.getUser(idAccount);
    if (us != null) {
        return ResponseEntity.ok(us);
    }
    return ResponseEntity.notFound().build();
}

@RequestMapping(
        value = "/",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
public ResponseEntity<List<User>> getAllUserAcc() {
    return ResponseEntity.ok(userdb.getAllUser());
}
}
```

### Stage ?
**User**

At `user` `model`, I used annotation `@GeneratedValue` with `generator` `UUID` . and `@GenericGenerator` the `name` is also `UUID`, `strategy` is `org.hibernate.id.UUIDGenerator` means ???

```java
@GeneratedValue(generator = "UUID")
@GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
```

```java
// https://github.com/acapela000/WeatherForecastAPI/blob/basic-sql/src/main/java/com/charlieThao/weather_forcast_demo/model/User.java

@Entity
@Table(name = "tc_user")
public class User {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private String id;

    @Column(nullable = false, unique = true)
    private String userName;//"unique"

    @Column(nullable = false, unique = true)
    private String email;//"unique"

    @Column(nullable = false)
    private String password;//"hashed"

    @ManyToMany//"default to empty list"
//    @Column(nullable = false)
    @JoinTable(
            name = "tc_user_location",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "location_id"))
    private List<Location> locationList = new ArrayList<>();

    @ManyToMany()//"default to Role with name 'guest'"
    @Column(nullable = false)
    @JoinTable(
            name = "tc_user_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private List<Role> roleList = new ArrayList<>();


    public User(String s, String nanami, String s1, String s2) {
    }
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
Once I alomost have the back-end code in place, I created the user interface for my web app. This involves designing the layout and visual elements for my app, I'm using `TypeScript` to code fore frontend and render HTML as well as using `Tailwind` for css part. Besides that, I also use a front-end framework like NextJs to simplify the process.

Temporary layout for desktop's screen.

{{< figure src="/wf-app/desktop-screen.png" width="100%">}}

I also tested the screen for the phone in order to make `grid` better between desktop screen and phone's layout.

{{< figure src="/wf-app/phone-screen-test.jpg" width="80%">}}

**More content is uploading...**

## 5.Testing - Deployment
### Deploying frontend

### Deploying backend

After finishing my web app, it's important to test it thoroughly to ensure it works as intended. This includes functional testing, integration testing, and performance testing. Once I almost have my backend code on place, I deploy my web app to a production environment.

As first, I attempted to deploy my application on `Heroku`. 

{{< figure src="/wf-app/heroku-register.png" width="100%">}}

But I got a little bit stuck when I tried on installing it by using `choco` with `cmd` `choco install heroku`. 

{{< figure src="/wf-app/choco-heroku-failed.png" width="100%">}}

Then I regconized that the cmd is not right. I read the docs again and try `choco install heroku-cli` and I made it. Successfully intalled `Heroku`.

[Install Heroku Docs](https://devcenter.heroku.com/articles/heroku-cli)

{{< figure src="/wf-app/choco-heroku-done-4over5.png" width="100%">}}

Then when I tried to build `Docker Images` with `heroku.yml`, I met some bugs and got stuck again.

[Building Docker Images with heroku.yml](https://devcenter.heroku.com/articles/build-docker-images-heroku-yml)

{{< figure src="/wf-app/heroku-build-docker-img-err.png" width="100%">}}

{{< figure src="/wf-app/heroku-build-docker-img-bug.png" width="100%">}}

Unbfornately, later than that, Heroku is officially not free anymore from the begining of April so I changed to use `Netlify`.

{{< figure src="/wf-app/netlify-deploy.png" width="100%">}}

After registered and upload the repository from `github`, I was waiting for my first time deploying backend code.

{{< figure src="/wf-app/netlify-dp-waiting-1.png" width="100%">}}

Finally, the deployment process is done and seem like the page is live. I was very excited at this time, can't wait to access into my onw site.

{{< figure src="/wf-app/netlify-dp-waiting-2.png" width="100%">}}

However, when I clicked on the deployed `url`, it turned to `Page not found`

{{< figure src="/wf-app/netlify-dp-pagenotfound.png" width="100%">}}

I tried to follow the instruction from "pagenotfound" "support guide" but it still didn't work. Then I searched on google and found out the truth is:

[Netlify's answer](https://answers.netlify.com/t/how-to-deploy-springboot-app-in-netlify/18252)

{{< figure src="/wf-app/netlify-not-java.png" width="100%">}}

After Heroku, Netlify, I searched for new source as Cloud Foundary. But it seems like complex to deploy then I tried to search for more free platform to deploy `Spring Boot`:

{{< figure src="/wf-app/free-platform-deploy.png" width="100%">}}

and I found one. I felt very happy and excited when I found `render` platform. It has lots of functions and easy to use.

[More about Render](https://render.com/)

{{< figure src="/wf-app/render-deploy.png" width="100%">}}

Oh, but stop for a minute... the journey of deployment is officially start from now.



**More content is uploading...**

## 6.Maintenance and updates, utilities
Once your web app is live, it's important to monitor its performance, fix any bugs that arise, and add new features as needed. You may also want to consider integrating analytics tools to track user behavior and improve the user experience over time.

Coding tool:
- IntelliJ
- Visual studio code

**More content is uploading...**