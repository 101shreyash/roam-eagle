\restrict dbmate

-- Dumped from database version 17.9 (Debian 17.9-0+deb13u1)
-- Dumped by pg_dump version 17.9 (Debian 17.9-0+deb13u1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: rental_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.rental_status AS ENUM (
    'for_rent',
    'rented'
);


--
-- Name: user_religion; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.user_religion AS ENUM (
    'islam',
    'hinduism',
    'unaffiliated',
    'buddhism',
    'christianity',
    'other'
);


--
-- Name: user_role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.user_role AS ENUM (
    'landlord',
    'applicant'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: property_info; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.property_info (
    userid integer NOT NULL,
    property_id integer NOT NULL,
    property_status public.rental_status DEFAULT 'for_rent'::public.rental_status NOT NULL,
    title character varying(100) NOT NULL,
    description text NOT NULL,
    total_room integer NOT NULL,
    country text NOT NULL,
    city text NOT NULL,
    postal_code text NOT NULL,
    monthly_price numeric(10,2)
);


--
-- Name: property_info_property_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.property_info_property_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: property_info_property_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.property_info_property_id_seq OWNED BY public.property_info.property_id;


--
-- Name: property_visual; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.property_visual (
    property_id integer NOT NULL,
    visual_id integer NOT NULL,
    property_image_url text NOT NULL,
    property_video_url text NOT NULL
);


--
-- Name: property_visual_visual_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.property_visual_visual_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: property_visual_visual_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.property_visual_visual_id_seq OWNED BY public.property_visual.visual_id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version character varying NOT NULL
);


--
-- Name: user_info; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_info (
    userid integer NOT NULL,
    profession character varying(100) NOT NULL,
    country character varying(100) NOT NULL,
    city text NOT NULL,
    full_name text NOT NULL,
    religion public.user_religion DEFAULT 'unaffiliated'::public.user_religion NOT NULL,
    native_language text NOT NULL,
    profile_picture text NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    userid integer NOT NULL,
    email text NOT NULL,
    hash_password text NOT NULL,
    role public.user_role DEFAULT 'applicant'::public.user_role NOT NULL,
    joined_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: users_userid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_userid_seq OWNED BY public.users.userid;


--
-- Name: property_info property_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.property_info ALTER COLUMN property_id SET DEFAULT nextval('public.property_info_property_id_seq'::regclass);


--
-- Name: property_visual visual_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.property_visual ALTER COLUMN visual_id SET DEFAULT nextval('public.property_visual_visual_id_seq'::regclass);


--
-- Name: users userid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_userid_seq'::regclass);


--
-- Name: property_info property_info_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.property_info
    ADD CONSTRAINT property_info_pkey PRIMARY KEY (property_id);


--
-- Name: property_visual property_visual_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.property_visual
    ADD CONSTRAINT property_visual_pkey PRIMARY KEY (visual_id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: user_info user_info_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_info
    ADD CONSTRAINT user_info_pkey PRIMARY KEY (userid);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- Name: property_info property_info_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.property_info
    ADD CONSTRAINT property_info_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid) ON DELETE CASCADE;


--
-- Name: property_visual property_visual_property_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.property_visual
    ADD CONSTRAINT property_visual_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.property_info(property_id) ON DELETE CASCADE;


--
-- Name: user_info user_info_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_info
    ADD CONSTRAINT user_info_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict dbmate


--
-- Dbmate schema migrations
--

INSERT INTO public.schema_migrations (version) VALUES
    ('20261011073248');
