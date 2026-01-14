import { Button, Card, Field, Input, Stack, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { axiosInstant } from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";

export default function SigninPage() {
  useEffect(() => {
    document.title = "Login";
  }, []);
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
    <Box
      minH="100vh"
      bg="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        style={{ width: "100%", maxWidth: "24rem" }}
      >
        <Card.Root
          border="2px solid"
          borderColor="blue.900"
          bg="white"
          color="blue.900"
          shadow="md"
        >
          <Card.Header>
            <Card.Title>Sign in</Card.Title>
            <Card.Description color="blue.700">
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
            <Button type="submit" loading={loading} bg="blue.900" color="white">
              Sign in
            </Button>
          </Card.Footer>
        </Card.Root>
      </form>
    </Box>
  );
}
