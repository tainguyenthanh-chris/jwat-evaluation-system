"use client";

import { Button, Card, Field, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { axiosInstant } from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";

export default function SigninPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loginStore = useAuthStore((s) => s.login);
  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await axiosInstant.post("/auth/login", {
        email,
        password,
      });

      loginStore(res.data.data);
      navigate("/", { replace: true });
    } catch (err: unknown) {
      const error = err as AxiosError<any>;
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card.Root maxW="sm" mx="auto" mt="20">
      <Card.Header>
        <Card.Title>Sign in</Card.Title>
        <Card.Description>
          Enter your email and password to sign in
        </Card.Description>
      </Card.Header>

      <Card.Body>
        <Stack gap="4">
          <Field.Root invalid={!!error}>
            <Field.Label>Email</Field.Label>
            <Input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field.Root>

          <Field.Root invalid={!!error}>
            <Field.Label>Password</Field.Label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <Field.ErrorText>{error}</Field.ErrorText>}
          </Field.Root>
        </Stack>
      </Card.Body>

      <Card.Footer justifyContent="flex-end">
        <Button variant="outline">Cancel</Button>
        <Button variant="solid" loading={loading} onClick={handleLogin}>
          Sign in
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
