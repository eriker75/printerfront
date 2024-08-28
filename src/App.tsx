import './App.css'
import useAuthStore from './stores/auth.store'
import LogoutButton from './components/ui/LogOutButton';

function App() {
    const userData = useAuthStore((state) => state.user);

    return (
        <div>
            <h1>Welcome {userData?.username}</h1>
            <div>
                <pre>
                    {JSON.stringify(userData, null, 2)}
                </pre>
            </div>
            <LogoutButton />
        </div>
    )
}

export default App
