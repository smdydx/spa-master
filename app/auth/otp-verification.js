import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { AuthLayout, GradientHeader, FormCard, PrimaryButton } from '../../components/auth';
import { useAuth } from '../../context/AuthContext';
import { OmbaroTheme } from '../../constants/theme';

const OTP_LENGTH = 4;
const RESEND_SECONDS = 30;

export default function OtpVerificationScreen() {
  const [code, setCode] = useState('');
  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');
  
  const inputRef = useRef(null);
  const router = useRouter();
  const { phoneNumber, verifyOTP } = useAuth();

  useEffect(() => {
    if (seconds <= 0) return;
    const id = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [seconds]);

  const maskPhone = (phone) => {
    if (!phone || phone.length < 4) return phone;
    const last4 = phone.slice(-4);
    const prefix = phone.slice(0, 2);
    return `${prefix}****${last4}`;
  };

  const onChangeCode = (text) => {
    const digits = text.replace(/[^\d]/g, '').slice(0, OTP_LENGTH);
    setCode(digits);
    setError('');
  };

  const handleVerify = async () => {
    if (code.length !== OTP_LENGTH || verifying) return;
    
    setVerifying(true);
    setError('');
    
    const result = verifyOTP(code);
    
    if (result.success) {
      router.replace('/(tabs)');
    } else {
      setError(result.error);
      setVerifying(false);
    }
  };

  const handleResend = () => {
    if (seconds > 0) return;
    setSeconds(RESEND_SECONDS);
    setCode('');
    setError('');
  };

  const isComplete = code.length === OTP_LENGTH;

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
        title="Enter Verification Code"
        subtitle={`We've sent a ${OTP_LENGTH}-digit code to ${maskPhone(phoneNumber)}`}
      />

      <FormCard>
        <TextInput
          ref={inputRef}
          value={code}
          onChangeText={onChangeCode}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          maxLength={OTP_LENGTH}
          autoFocus
          style={styles.hiddenInput}
        />

        <Pressable
          onPress={() => inputRef.current?.focus()}
          style={styles.otpRow}
        >
          {Array.from({ length: OTP_LENGTH }).map((_, i) => {
            const char = code[i] ?? '';
            const active = i === code.length && code.length < OTP_LENGTH;
            return (
              <View
                key={i}
                style={[
                  styles.otpCell,
                  active && styles.otpCellActive,
                  error && styles.otpCellError,
                ]}
              >
                <Text style={styles.otpChar}>{char}</Text>
              </View>
            );
          })}
        </Pressable>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>
            Didn't receive the code?{' '}
            <Text
              style={[
                styles.resendLink,
                { color: seconds > 0 ? OmbaroTheme.colors.textGray : OmbaroTheme.colors.roseGold }
              ]}
              onPress={handleResend}
            >
              {seconds > 0 ? `Resend in ${seconds}s` : 'Tap to resend'}
            </Text>
          </Text>
        </View>

        <PrimaryButton
          title={verifying ? 'Verifying...' : 'Verify & Continue'}
          onPress={handleVerify}
          disabled={!isComplete}
          loading={verifying}
        />

        <View style={styles.hintCard}>
          <Text style={styles.hintText}>
            💡 Hint: Use OTP code <Text style={styles.hintCode}>1234</Text> to verify
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
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    height: 0,
    width: 0,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: OmbaroTheme.spacing.xl,
    gap: OmbaroTheme.spacing.md,
  },
  otpCell: {
    flex: 1,
    aspectRatio: 1,
    maxWidth: 70,
    backgroundColor: OmbaroTheme.colors.darkCard,
    borderRadius: OmbaroTheme.borderRadius.md,
    borderWidth: 2,
    borderColor: OmbaroTheme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpCellActive: {
    borderColor: OmbaroTheme.colors.roseGold,
  },
  otpCellError: {
    borderColor: OmbaroTheme.colors.error,
  },
  otpChar: {
    fontSize: OmbaroTheme.fontSize.xxl,
    fontWeight: OmbaroTheme.fontWeight.bold,
    color: OmbaroTheme.colors.textLight,
  },
  errorText: {
    fontSize: OmbaroTheme.fontSize.sm,
    color: OmbaroTheme.colors.error,
    textAlign: 'center',
    marginTop: -OmbaroTheme.spacing.lg,
    marginBottom: OmbaroTheme.spacing.md,
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: OmbaroTheme.spacing.lg,
  },
  resendText: {
    fontSize: OmbaroTheme.fontSize.sm,
    color: OmbaroTheme.colors.textLight,
  },
  resendLink: {
    fontWeight: OmbaroTheme.fontWeight.semibold,
  },
  hintCard: {
    backgroundColor: OmbaroTheme.colors.darkCard,
    borderRadius: OmbaroTheme.borderRadius.md,
    padding: OmbaroTheme.spacing.md,
    marginTop: OmbaroTheme.spacing.md,
    borderWidth: 1,
    borderColor: OmbaroTheme.colors.roseGold,
  },
  hintText: {
    fontSize: OmbaroTheme.fontSize.sm,
    color: OmbaroTheme.colors.textLight,
    textAlign: 'center',
  },
  hintCode: {
    fontWeight: OmbaroTheme.fontWeight.bold,
    color: OmbaroTheme.colors.roseGold,
  },
});
