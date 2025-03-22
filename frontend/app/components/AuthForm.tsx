// "use client";
// import React from 'react';

// import {zodResolver} from '@hookform/resolvers/zod';
// import {DefaultValues, SubmitHandler, useForm, UseFormReturn,FieldValues, Path} from 'react-hook-form';
// import {z, ZodType} from 'zod';

// import { Button } from "~/components/ui/button"
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "~/components/ui/form"
// import { Input } from "~/components/ui/input"
// import { FIELD_NAMES, FIELD_TYPES } from '~/constants';
// import { Toaster } from "~/components/ui/sonner"


// interface Props<T extends FieldValues> {
//     schema: ZodType<T>;
//     defaultValues: T;
//     onSubmit: (data: T) => Promise<{success: boolean; error?: string}>;
//     type: 'SIGN_IN' | 'SIGN_UP';
// };


// const AuthForm = <T extends FieldValues>({type,schema, defaultValues , onSubmit} : Props<T>) => {
//     const router = useRouter();
//     const isSignIn = type === 'SIGN_IN';

//     const form: UseFormReturn<T> = useForm({
//         resolver: zodResolver(schema),
//         defaultValues: defaultValues as DefaultValues<T>,
//     });

//     const handleSubmit: SubmitHandler<T> = async (data) => {
//         const result = await onSubmit(data)

//         if (result.success){
//             toast(isSignIn
//                     ? "You have Successfully signed in"
//                     : "You have successfully signed up")
//             router.push("/")
//         } else {
//             toast(`Error ${isSignIn ? "signing in" : "signing up"}`)
//         }
//     }
//     return (
//         <div className='flex flex-col gap-4'>
//             <h1 className='text-2xl font-semibold text-ivory'>
//                 {isSignIn ? "Welcome back!" : "Create an account"}
//             </h1>
//             <p className='text-ivory'>{isSignIn ? "Sign in to see your points and rewards" : "Sign up to receive points and get rewards"}</p>
//             <Form {...form}>
//                 <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 w-full ">

//                     {Object.keys(defaultValues).map((field) => (
//                         <FormField
//                             key={field}
//                             control={form.control}
//                             name={field as Path<T>}
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel className='capitalize text-ivory'>{FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}</FormLabel>
//                                     <FormControl>
//                                         <Input required type={ FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]} {...field} className='w-full min-h-14 border-none text-base font-bold placeholder:font-normal text-black placeholder:text-light-100 focus-visible:ring-0 focus-visible:shadow-none champagne'/>
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                     ))}
//                     <Button type="submit" className='text-ivory hover:bg-primary inline-flex min-h-14 w-full items-center justify-center rounded-md px-6 py-2 font-bold text-base'>{isSignIn ? "Sign In": "Sign Up"}</Button>
//                 </form>
//             </Form>
//             <p className='text-center text-base font-medium text-ivory'>
//                 {isSignIn ? "Don't have an account? " : "Already have an account? "}
//                 <a href={isSignIn? "/sign-up" : "/sign-in"} className='text-white'>{isSignIn ? "Create an account " : "Sign in "}</a>
//             </p>
//         </div>
//     )
// }

// export default AuthForm;