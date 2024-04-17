--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2024-04-17 08:00:11 EDT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 16556)
-- Name: color_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.color_groups (
    color_group_id integer NOT NULL,
    color_group_name character varying(30) NOT NULL,
    created_on timestamp without time zone NOT NULL,
    active boolean,
    updated_on timestamp without time zone
);


ALTER TABLE public.color_groups OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16555)
-- Name: color_groups_color_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.color_groups_color_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.color_groups_color_group_id_seq OWNER TO postgres;

--
-- TOC entry 3656 (class 0 OID 0)
-- Dependencies: 218
-- Name: color_groups_color_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.color_groups_color_group_id_seq OWNED BY public.color_groups.color_group_id;


--
-- TOC entry 222 (class 1259 OID 16564)
-- Name: color_in_color_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.color_in_color_group (
    color_id integer NOT NULL,
    color_group_id integer NOT NULL
);


ALTER TABLE public.color_in_color_group OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16563)
-- Name: color_in_color_group_color_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.color_in_color_group_color_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.color_in_color_group_color_group_id_seq OWNER TO postgres;

--
-- TOC entry 3657 (class 0 OID 0)
-- Dependencies: 221
-- Name: color_in_color_group_color_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.color_in_color_group_color_group_id_seq OWNED BY public.color_in_color_group.color_group_id;


--
-- TOC entry 220 (class 1259 OID 16562)
-- Name: color_in_color_group_color_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.color_in_color_group_color_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.color_in_color_group_color_id_seq OWNER TO postgres;

--
-- TOC entry 3658 (class 0 OID 0)
-- Dependencies: 220
-- Name: color_in_color_group_color_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.color_in_color_group_color_id_seq OWNED BY public.color_in_color_group.color_id;


--
-- TOC entry 217 (class 1259 OID 16549)
-- Name: colors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.colors (
    color_id integer NOT NULL,
    color_name character varying(30) NOT NULL,
    hex_code character varying(6) NOT NULL,
    created_on timestamp without time zone NOT NULL,
    active boolean,
    updated_on timestamp without time zone
);


ALTER TABLE public.colors OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16548)
-- Name: colors_color_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.colors_color_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.colors_color_id_seq OWNER TO postgres;

--
-- TOC entry 3659 (class 0 OID 0)
-- Dependencies: 216
-- Name: colors_color_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.colors_color_id_seq OWNED BY public.colors.color_id;


--
-- TOC entry 225 (class 1259 OID 16583)
-- Name: user_color; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_color (
    user_id integer NOT NULL,
    color_id integer NOT NULL
);


ALTER TABLE public.user_color OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16582)
-- Name: user_color_color_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_color_color_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_color_color_id_seq OWNER TO postgres;

--
-- TOC entry 3660 (class 0 OID 0)
-- Dependencies: 224
-- Name: user_color_color_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_color_color_id_seq OWNED BY public.user_color.color_id;


--
-- TOC entry 228 (class 1259 OID 16602)
-- Name: user_color_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_color_group (
    user_id integer NOT NULL,
    color_group_id integer NOT NULL
);


ALTER TABLE public.user_color_group OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16601)
-- Name: user_color_group_color_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_color_group_color_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_color_group_color_group_id_seq OWNER TO postgres;

--
-- TOC entry 3661 (class 0 OID 0)
-- Dependencies: 227
-- Name: user_color_group_color_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_color_group_color_group_id_seq OWNED BY public.user_color_group.color_group_id;


--
-- TOC entry 226 (class 1259 OID 16600)
-- Name: user_color_group_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_color_group_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_color_group_user_id_seq OWNER TO postgres;

--
-- TOC entry 3662 (class 0 OID 0)
-- Dependencies: 226
-- Name: user_color_group_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_color_group_user_id_seq OWNED BY public.user_color_group.user_id;


--
-- TOC entry 223 (class 1259 OID 16581)
-- Name: user_color_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_color_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_color_user_id_seq OWNER TO postgres;

--
-- TOC entry 3663 (class 0 OID 0)
-- Dependencies: 223
-- Name: user_color_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_color_user_id_seq OWNED BY public.user_color.user_id;


--
-- TOC entry 215 (class 1259 OID 16542)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    user_name character varying(30) NOT NULL,
    user_password character varying(255) NOT NULL,
    created_on timestamp without time zone NOT NULL,
    last_login timestamp without time zone,
    active boolean,
    updated_on timestamp without time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16541)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO postgres;

--
-- TOC entry 3664 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 3469 (class 2604 OID 16559)
-- Name: color_groups color_group_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.color_groups ALTER COLUMN color_group_id SET DEFAULT nextval('public.color_groups_color_group_id_seq'::regclass);


--
-- TOC entry 3470 (class 2604 OID 16567)
-- Name: color_in_color_group color_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.color_in_color_group ALTER COLUMN color_id SET DEFAULT nextval('public.color_in_color_group_color_id_seq'::regclass);


--
-- TOC entry 3471 (class 2604 OID 16568)
-- Name: color_in_color_group color_group_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.color_in_color_group ALTER COLUMN color_group_id SET DEFAULT nextval('public.color_in_color_group_color_group_id_seq'::regclass);


--
-- TOC entry 3468 (class 2604 OID 16552)
-- Name: colors color_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colors ALTER COLUMN color_id SET DEFAULT nextval('public.colors_color_id_seq'::regclass);


--
-- TOC entry 3472 (class 2604 OID 16586)
-- Name: user_color user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_color ALTER COLUMN user_id SET DEFAULT nextval('public.user_color_user_id_seq'::regclass);


--
-- TOC entry 3473 (class 2604 OID 16587)
-- Name: user_color color_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_color ALTER COLUMN color_id SET DEFAULT nextval('public.user_color_color_id_seq'::regclass);


--
-- TOC entry 3474 (class 2604 OID 16605)
-- Name: user_color_group user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_color_group ALTER COLUMN user_id SET DEFAULT nextval('public.user_color_group_user_id_seq'::regclass);


--
-- TOC entry 3475 (class 2604 OID 16606)
-- Name: user_color_group color_group_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_color_group ALTER COLUMN color_group_id SET DEFAULT nextval('public.user_color_group_color_group_id_seq'::regclass);


--
-- TOC entry 3467 (class 2604 OID 16545)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 3641 (class 0 OID 16556)
-- Dependencies: 219
-- Data for Name: color_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.color_groups (color_group_id, color_group_name, created_on, active, updated_on) FROM stdin;
\.


--
-- TOC entry 3644 (class 0 OID 16564)
-- Dependencies: 222
-- Data for Name: color_in_color_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.color_in_color_group (color_id, color_group_id) FROM stdin;
\.


--
-- TOC entry 3639 (class 0 OID 16549)
-- Dependencies: 217
-- Data for Name: colors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.colors (color_id, color_name, hex_code, created_on, active, updated_on) FROM stdin;
\.


--
-- TOC entry 3647 (class 0 OID 16583)
-- Dependencies: 225
-- Data for Name: user_color; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_color (user_id, color_id) FROM stdin;
\.


--
-- TOC entry 3650 (class 0 OID 16602)
-- Dependencies: 228
-- Data for Name: user_color_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_color_group (user_id, color_group_id) FROM stdin;
\.


--
-- TOC entry 3637 (class 0 OID 16542)
-- Dependencies: 215
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, user_name, user_password, created_on, last_login, active, updated_on) FROM stdin;
10	testuser	$2b$10$gWOquj70.FLu0CHTbXfe3OByhs7KHA3ziL39s.oPsOqTdOvP5x2Nq	2024-01-22 11:20:54.312	\N	t	\N
11	testuser2	$2b$10$UV9uzHvD5kl7fVUO7STcr.5.lN3esfHItXOrHrmd.BHAGQHDwj58i	2024-01-29 11:06:45.811	\N	t	\N
12	testuser3	$2b$10$haqA4p.3k2ew9T4GsMx6b.0wC46/RXfBcAk/XZrAs4K4rIjgSZcqu	2024-01-29 11:10:23.803	\N	t	\N
\.


--
-- TOC entry 3665 (class 0 OID 0)
-- Dependencies: 218
-- Name: color_groups_color_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.color_groups_color_group_id_seq', 1, false);


--
-- TOC entry 3666 (class 0 OID 0)
-- Dependencies: 221
-- Name: color_in_color_group_color_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.color_in_color_group_color_group_id_seq', 1, false);


--
-- TOC entry 3667 (class 0 OID 0)
-- Dependencies: 220
-- Name: color_in_color_group_color_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.color_in_color_group_color_id_seq', 1, false);


--
-- TOC entry 3668 (class 0 OID 0)
-- Dependencies: 216
-- Name: colors_color_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.colors_color_id_seq', 1, false);


--
-- TOC entry 3669 (class 0 OID 0)
-- Dependencies: 224
-- Name: user_color_color_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_color_color_id_seq', 1, false);


--
-- TOC entry 3670 (class 0 OID 0)
-- Dependencies: 227
-- Name: user_color_group_color_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_color_group_color_group_id_seq', 1, false);


--
-- TOC entry 3671 (class 0 OID 0)
-- Dependencies: 226
-- Name: user_color_group_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_color_group_user_id_seq', 1, false);


--
-- TOC entry 3672 (class 0 OID 0)
-- Dependencies: 223
-- Name: user_color_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_color_user_id_seq', 1, false);


--
-- TOC entry 3673 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 12, true);


--
-- TOC entry 3481 (class 2606 OID 16561)
-- Name: color_groups color_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.color_groups
    ADD CONSTRAINT color_groups_pkey PRIMARY KEY (color_group_id);


--
-- TOC entry 3483 (class 2606 OID 16570)
-- Name: color_in_color_group color_in_color_group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.color_in_color_group
    ADD CONSTRAINT color_in_color_group_pkey PRIMARY KEY (color_id, color_group_id);


--
-- TOC entry 3479 (class 2606 OID 16554)
-- Name: colors colors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colors
    ADD CONSTRAINT colors_pkey PRIMARY KEY (color_id);


--
-- TOC entry 3487 (class 2606 OID 16608)
-- Name: user_color_group user_color_group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_color_group
    ADD CONSTRAINT user_color_group_pkey PRIMARY KEY (user_id, color_group_id);


--
-- TOC entry 3485 (class 2606 OID 16589)
-- Name: user_color user_color_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_color
    ADD CONSTRAINT user_color_pkey PRIMARY KEY (user_id, color_id);


--
-- TOC entry 3477 (class 2606 OID 16547)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3488 (class 2606 OID 16571)
-- Name: color_in_color_group fk_color; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.color_in_color_group
    ADD CONSTRAINT fk_color FOREIGN KEY (color_id) REFERENCES public.colors(color_id) ON DELETE SET NULL;


--
-- TOC entry 3490 (class 2606 OID 16595)
-- Name: user_color fk_color; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_color
    ADD CONSTRAINT fk_color FOREIGN KEY (color_id) REFERENCES public.colors(color_id) ON DELETE SET NULL;


--
-- TOC entry 3489 (class 2606 OID 16576)
-- Name: color_in_color_group fk_color_group; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.color_in_color_group
    ADD CONSTRAINT fk_color_group FOREIGN KEY (color_group_id) REFERENCES public.color_groups(color_group_id) ON DELETE SET NULL;


--
-- TOC entry 3492 (class 2606 OID 16614)
-- Name: user_color_group fk_color_group; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_color_group
    ADD CONSTRAINT fk_color_group FOREIGN KEY (color_group_id) REFERENCES public.color_groups(color_group_id) ON DELETE SET NULL;


--
-- TOC entry 3491 (class 2606 OID 16590)
-- Name: user_color fk_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_color
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE SET NULL;


--
-- TOC entry 3493 (class 2606 OID 16609)
-- Name: user_color_group fk_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_color_group
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE SET NULL;


-- Completed on 2024-04-17 08:00:11 EDT

--
-- PostgreSQL database dump complete
--

