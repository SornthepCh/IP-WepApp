public class PresenceTracker
{
    private static readonly Dictionary<string, List<string>> OnlineUsers = new();

   public Task<bool> UserConnected(string username, string connectionId)
    {
        bool isOnline = false; //<--
        lock (OnlineUsers) //lock เพื่อป้องกัน race condition, อาจเกิดปัญหาคอขวด
        {
            if (OnlineUsers.ContainsKey(username))
                OnlineUsers[username].Add(connectionId);
            else {
                OnlineUsers.Add(username, new List<string> { connectionId });
                isOnline = true;//<--
            }
        }
        return Task.FromResult(isOnline);//<--
    }
    public Task<bool> UserDisconnected(string username, string connectionId)
    {
        bool isOffline = false; //<--
        lock (OnlineUsers)
        {
            if (OnlineUsers.ContainsKey(username))
                OnlineUsers[username].Remove(connectionId);
            if (OnlineUsers[username].Count < 1){
                OnlineUsers.Remove(username);
                isOffline = true; //<--
            }
        }
        return Task.FromResult(isOffline); //<--
    }
    public Task<string[]> GetOnlineUsers()
    {
        string[] users;
        lock (OnlineUsers)
        {
            users = OnlineUsers.OrderBy(item => item.Key).Select(item => item.Key).ToArray();
        }
        return Task.FromResult(users);
    }
    public static Task<List<string>?> GetConnectionsForUser(string username)
    {
        List<string>? connectionIds;
        lock (OnlineUsers)
        {
            connectionIds = OnlineUsers.GetValueOrDefault(username);
        }
        return Task.FromResult(connectionIds);
    }
}