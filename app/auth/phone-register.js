import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Phone, Gift } from 'lucide-react-native';
import { AuthLayout, GradientHeader, FormCard, InputField, PrimaryButton } from '../../components/auth';
import { useAuth } from '../../context/AuthContext';
import { OmbaroTheme } from '../../constants/theme';

export default function PhoneRegisterScreen() {
  const [mobile, setMobile] = useState('');
  const [referral, setReferral] = useState('');
  const [error, setError] = useState('');
  
  const router = useRouter();
  const { registerPhone } = useAuth();

  const handleSendOTP = () => {
    setError('');
    const result = registerPhone(mobile);
    
    if (result.success) {
      router.push('/auth/otp-verification');
    } else {
      setError(result.error);
    }
  };

  const isValid = mobile.length >= 10;

  return (
    <AuthLayout>
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backButton}
        activeOpacity={0.7}
      >
        <ArrowLeft size={24} color={OmbaroTheme.colors.textDark} />
      </TouchableOpacity>

      <GradientHeader
        title="Enter Your Mobile Number"
        subtitle="We'll send you a verification code"
      />

      <FormCard>
        <InputField
          label="Referral Code (Optional)"
          placeholder="Enter referral code"
          value={referral}
          onChangeText={setReferral}
          icon={<Gift size={20} color={OmbaroTheme.colors.textGray} />}
        />
        <Text style={styles.hint}>
          Have a referral code? Get 10% off your first booking!
        </Text>

        <InputField
          label="Mobile Number"
          placeholder="Enter 10-digit mobile number"
          value={mobile}
          onChangeText={(text) => setMobile(text.replace(/[^0-9]/g, ''))}
          keyboardType="number-pad"
          maxLength={15}
          error={error}
          icon={<Phone size={20} color={OmbaroTheme.colors.textGray} />}
        />

        <PrimaryButton
          title="Send OTP"
          onPress={handleSendOTP}
          disabled={!isValid}
        />

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>🔒 Your Privacy is Protected</Text>
          <Text style={styles.infoText}>
            We use your mobile number only for account verification and booking confirmations.
            Your data is encrypted and secure.
          </Text>
        </View>
      </FormCard>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  backButton: {
    width: 48,
    height: 48,
    borderRadius: OmbaroTheme.borderRadius.md,
    backgroundColor: OmbaroTheme.colors.beige,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: OmbaroTheme.spacing.md,
  },
  hint: {
    fontSize: OmbaroTheme.fontSize.xs,
    color: OmbaroTheme.colors.roseGoldDark,
    marginTop: -OmbaroTheme.spacing.sm,
    marginBottom: OmbaroTheme.spacing.md,
    marginLeft: OmbaroTheme.spacing.xs,
  },
  infoCard: {
    backgroundColor: OmbaroTheme.colors.darkCard,
    borderRadius: OmbaroTheme.borderRadius.md,
    padding: OmbaroTheme.spacing.md,
    marginTop: OmbaroTheme.spacing.lg,
    borderWidth: 1,
    borderColor: OmbaroTheme.colors.border,
  },
  infoTitle: {
    fontSize: OmbaroTheme.fontSize.md,
    fontWeight: OmbaroTheme.fontWeight.semibold,
    color: OmbaroTheme.colors.textLight,
    marginBottom: OmbaroTheme.spacing.sm,
  },
  infoText: {
    fontSize: OmbaroTheme.fontSize.sm,
    color: OmbaroTheme.colors.textGray,
    lineHeight: 20,
  },
});
