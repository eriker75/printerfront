import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema, { LoginFormInputs } from "../../validators/loggin.validator";
import { useForm } from "react-hook-form";
import useLogin from "../../services/useLogin";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import useAuthStore from "../../stores/auth.store";
import { User } from "../../model/User.model";
import { AxiosResponse } from "axios";
import { useEffect } from "react";
import LoaderPage from "../../components/LoaderPage";

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const [
    authenticate,
    isAuthLoading,
    isUserLoggedIn,
  ] = useAuthStore((state) => [
    state.setLoggedIn,
    state.isAuthLoading,
    state.isLoggedIn,
  ])

  const navigate = useNavigate();
  const loginMutation = useLogin();
  const { register, handleSubmit, formState: { errors: formErros } } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const redirectHandler = () => {
    if (isUserLoggedIn) {
      if (searchParams.has('printer')) {
        navigate(`/dashboard/printers/${searchParams.get('printer')}`);
      } else {
        navigate('/');
      }
    }
  }

  const onSubmit = (data: LoginFormInputs) => {
    loginMutation.mutate(data, {
      onSuccess: (response: AxiosResponse<{ user: User; token: string }>) => {
        const user = response.data.user;
        authenticate(user);
        redirectHandler();
      }
    });
  };

  useEffect(() => {
    if (isUserLoggedIn) {
      redirectHandler();
    }
  }, [isUserLoggedIn, navigate]);

  if (isAuthLoading) {
    return <LoaderPage/>;
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="h-screen flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white" to={"/"}>
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
          Pacificorp Printer Aplication
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required={true}
                />
                {formErros.email && <p className="mt-2 text-sm text-red-600">{formErros?.email?.message as string}</p>}
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input
                  type="password"
                  id="password"
                  {...register("password")}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true}
                />
                {formErros.password && <p className="mt-2 text-sm text-red-600">{formErros?.password?.message as string}</p>}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required={true} />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                  </div>
                </div>
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 text-white">Forgot password?</a>
              </div>
              <button
                type="submit"
                className="w-full border text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? 'Signing In...' : 'Sign In'}
              </button>

              {loginMutation.error && (
                <p className="mt-2 text-sm text-red-600">
                  {loginMutation.error.message || 'An error occurred'}
                </p>
              )}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginPage
