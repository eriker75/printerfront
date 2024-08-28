import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            return (
                <div className="error-page">
                    <h1>Oops!</h1>
                    <h2>404 - Page Not Found</h2>
                    <p>Sorry, the page you are looking for does not exist.</p>
                    <a href="/">Go to Homepage</a>
                </div>
            );
        }

        if (error.status === 401) {
            return (
                <div className="error-page">
                    <h1>Oops!</h1>
                    <h2>401 - Unauthorized</h2>
                    <p>Sorry, you don't have access to this page.</p>
                    <a href="/login">Login</a>
                </div>
            );
        }

        if (error.status === 503) {
            return (
                <div className="error-page">
                    <h1>Oops!</h1>
                    <h2>503 - Service Unavailable</h2>
                    <p>Sorry, we're having some technical difficulties. Please try again later.</p>
                </div>
            );
        }
    }

    // For other types of errors
    return (
        <div className="error-page">
            <h1>Oops!</h1>
            <h2>Something went wrong</h2>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error instanceof Error ? error.message : 'Unknown error'}</i>
            </p>
        </div>
    );
}

export default ErrorPage;
