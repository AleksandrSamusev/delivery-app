import {View, Text, Alert} from 'react-native'
import {Link, router} from "expo-router";
import {useState} from 'react'
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import {signIn} from "@/lib/appwrite";

const SignIn = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const submit = async () => {
        const {email, password} = form;
        if (!email || !password) {
            return Alert.alert('Error', 'Please provide credentials!')
        }
        setIsSubmitting(true);
        try {

            await signIn({email, password});

            router.replace('/');
        } catch (error: any) {
            Alert.alert('Error: ', error.message);
        } finally {
            setIsSubmitting(false);
        }

    }

    return (
        <View className='gap-10 bg-white rounded-lg p-5 mt-5'>
            <CustomInput
                placeholder='Enter your email address'
                value={form.email}
                onChangeText={(text) => setForm((prev) => ({...prev, email: text}))}
                label='Email address'
                keyboardType='email-address'
            />
            <CustomInput
                placeholder='Enter your password'
                value={form.password}
                onChangeText={(text) => setForm((prev) => ({...prev, password: text}))}
                label='Password'
                secureTextEntry={true}
            />

            <CustomButton
                title='Sign In'
                isLoading={isSubmitting}
                onPress={submit}
            />

            <View className='flex justify-center mt-2 flex-row gap-2'>
                <Text className='base-regular text-gray-100'>Don't have an account?'</Text>
                <Link href='/sign-up' className='base-bold text-primary'>Sign Up</Link>
            </View>
        </View>
    )
}
export default SignIn
