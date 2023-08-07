## User Registration

The following Unity script demonstrates how to register a new user with the `/api/users` endpoint:

csharpCopy code

`using UnityEngine;
using UnityEngine.Networking;

public class RegistrationManager : MonoBehaviour
{
    private const string apiUrl = "http://localhost:3000/api/users";

    public void RegisterUser(string username, string password, string name, int age)
    {
        StartCoroutine(RegisterUserCoroutine(username, password, name, age));
    }

    private IEnumerator RegisterUserCoroutine(string username, string password, string name, int age)
    {
        // Create a JSON object for user registration data
        UserRegistrationData userRegistrationData = new UserRegistrationData
        {
            username = username,
            password = password,
            name = name,
            age = age
            // Add other fields as needed
        };

        string jsonData = JsonUtility.ToJson(userRegistrationData);

        UnityWebRequest request = UnityWebRequest.Post(apiUrl, jsonData);
        request.SetRequestHeader("Content-Type", "application/json");

        yield return request.SendWebRequest();

        if (request.result != UnityWebRequest.Result.Success)
        {
            Debug.LogError("Failed to register user: " + request.error);
            yield break;
        }

        Debug.Log("User registration successful!");
    }

    [System.Serializable]
    private class UserRegistrationData
    {
        public string username;
        public string password;
        public string name;
        public int age;
        // Add other fields as needed
    }
}` 

## User Login

The following Unity script demonstrates how to perform user login using the `/api/login` endpoint:

csharpCopy code

`using UnityEngine;
using UnityEngine.Networking;

public class LoginManager : MonoBehaviour
{
    private const string apiUrl = "http://localhost:3000/api/login";

    public void Login(string username, string password)
    {
        StartCoroutine(LoginCoroutine(username, password));
    }

    private IEnumerator LoginCoroutine(string username, string password)
    {
        // Create a JSON object for login data
        LoginData loginData = new LoginData
        {
            username = username,
            password = password
        };

        string jsonData = JsonUtility.ToJson(loginData);

        UnityWebRequest request = UnityWebRequest.Post(apiUrl, jsonData);
        request.SetRequestHeader("Content-Type", "application/json");

        yield return request.SendWebRequest();

        if (request.result != UnityWebRequest.Result.Success)
        {
            Debug.LogError("Login failed: " + request.error);
            yield break;
        }

        Debug.Log("Login successful!");
        // Handle the response and set necessary cookies or authentication tokens
    }

    [System.Serializable]
    private class LoginData
    {
        public string username;
        public string password;
    }
}` 

## Leaderboards

The following Unity script demonstrates how to fetch and update the leaderboards using the `/api/leaderboards` endpoint:

csharpCopy code

`using UnityEngine;
using UnityEngine.Networking;

public class LeaderboardManager : MonoBehaviour
{
    private const string apiUrl = "http://localhost:3000/api/leaderboards";

    public void FetchLeaderboard()
    {
        StartCoroutine(FetchLeaderboardCoroutine());
    }

    private IEnumerator FetchLeaderboardCoroutine()
    {
        UnityWebRequest request = UnityWebRequest.Get(apiUrl);
        yield return request.SendWebRequest();

        if (request.result != UnityWebRequest.Result.Success)
        {
            Debug.LogError("Failed to fetch leaderboards: " + request.error);
            yield break;
        }

        string jsonResponse = request.downloadHandler.text;
        LeaderboardEntry[] leaderboardEntries = JsonUtility.FromJson<LeaderboardEntry[]>(jsonResponse);

        // Process the leaderboard entries
        foreach (LeaderboardEntry entry in leaderboardEntries)
        {
            // Do something with each leaderboard entry
            Debug.Log("User ID: " + entry.userId);
            Debug.Log("Points: " + entry.points);
            // ...
        }
    }

    public void UpdateLeaderboard(LeaderboardEntry[] newEntries)
    {
        StartCoroutine(UpdateLeaderboardCoroutine(newEntries));
    }

    private IEnumerator UpdateLeaderboardCoroutine(LeaderboardEntry[] newEntries)
    {
        string jsonData = JsonUtility.ToJson(newEntries);

        UnityWebRequest request = UnityWebRequest.Post(apiUrl, jsonData);
        request.SetRequestHeader("Content-Type", "application/json");

        yield return request.SendWebRequest();

        if (request.result != UnityWebRequest.Result.Success)
        {
            Debug.LogError("Failed to update leaderboard: " + request.error);
            yield break;
        }

        Debug.Log("Leaderboard updated successfully!");
    }

    [System.Serializable]
    private class LeaderboardEntry
    {
        public string userId;
        public int points;
        // Add other fields as needed
    }
}` 

## Missions

The following Unity script demonstrates how to fetch and create new missions using the `/api/missions` endpoint:

csharpCopy code

`using UnityEngine;
using UnityEngine.Networking;

public class MissionManager : MonoBehaviour
{
    private const string apiUrl = "http://localhost:3000/api/missions";

    public void FetchMissions()
    {
        StartCoroutine(FetchMissionsCoroutine());
    }

    private IEnumerator FetchMissionsCoroutine()
    {
        UnityWebRequest request = UnityWebRequest.Get(apiUrl);
        yield return request.SendWebRequest();

        if (request.result != UnityWebRequest.Result.Success)
        {
            Debug.LogError("Failed to fetch missions: " + request.error);
            yield break;
        }

        string jsonResponse = request.downloadHandler.text;
        MissionData[] missions = JsonUtility.FromJson<MissionData[]>(jsonResponse);

        // Process the missions data
        foreach (MissionData mission in missions)
        {
            // Do something with each mission data
            Debug.Log("Mission ID: " + mission.id);
            Debug.Log("Mission Title: " + mission.title);
            // ...
        }
    }

    public void CreateMission(string title, string description)
    {
        StartCoroutine(CreateMissionCoroutine(title, description));
    }

    private IEnumerator CreateMissionCoroutine(string title, string description)
    {
        // Create a JSON object for the new mission data
        MissionData newMissionData = new MissionData
        {
            title = title,
            description = description
            // Add other fields as needed
        };

        string jsonData = JsonUtility.ToJson(newMissionData);

        UnityWebRequest request = UnityWebRequest.Post(apiUrl, jsonData);
        request.SetRequestHeader("Content-Type", "application/json");

        yield return request.SendWebRequest();

        if (request.result != UnityWebRequest.Result.Success)
        {
            Debug.LogError("Failed to create mission: " + request.error);
            yield break;
        }

        Debug.Log("Mission created successfully!");
    }

    [System.Serializable]
    private class MissionData
    {
        public string id;
        public string title;
        public string description;
        // Add other fields as needed
    }
}` 

## User Information

The following Unity script demonstrates how to fetch user information using the `/api/users/:userId` endpoint:

csharpCopy code

`using UnityEngine;
using UnityEngine.Networking;

public class UserInfoManager : MonoBehaviour
{
    private const string apiUrl = "http://localhost:3000/api/users/";

    public void FetchUserInfo(string userId)
    {
        StartCoroutine(FetchUserInfoCoroutine(userId));
    }

    private IEnumerator FetchUserInfoCoroutine(string userId)
    {
        UnityWebRequest request = UnityWebRequest.Get(apiUrl + userId);
        yield return request.SendWebRequest();

        if (request.result != UnityWebRequest.Result.Success)
        {
            Debug.LogError("Failed to fetch user information: " + request.error);
            yield break;
        }

        string jsonResponse = request.downloadHandler.text;
        UserInfoData userInfo = JsonUtility.FromJson<UserInfoData>(jsonResponse);

        // Process the user information data
        Debug.Log("User ID: " + userInfo.id);
        Debug.Log("Username: " + userInfo.username);
        Debug.Log("Name: " + userInfo.name);
        // ...
    }

    [System.Serializable]
    private class UserInfoData
    {
        public string id;
        public string username;
        public string name;
        public int age;
        // Add other fields as needed
    }
} 
```
