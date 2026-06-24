import React, { useEffect, useMemo, useRef } from 'react';
import anime from 'animejs';
import * as THREE from 'three';

const capabilities = [
  {
    title: '高并发架构',
    text: '主导大型分布式系统设计与落地，关注性能调优、服务治理、稳定性与多活架构。',
  },
  {
    title: 'AI 工程化',
    text: '熟练使用 LangChain、LangGraph、vLLM 等工具链，构建 RAG、NL2SQL 与多 Agent 应用。',
  },
  {
    title: '系统优化',
    text: '覆盖 GC、响应时间、缓存、CICD、可观测性与安全合规，持续提升系统质量。',
  },
  {
    title: '团队协作',
    text: '具备技术管理、Code Review、规范建设与跨部门协作经验，推动交付效率提升。',
  },
];

const projects = [
  {
    name: 'QueryMind',
    summary: '本地化自然语言数据分析平台，支持中文提问、自动生成安全 SQL、图表分析、动态脱敏与审计追溯。',
    tags: ['Qwen2.5', 'vLLM', 'NL2SQL', 'RAG', 'pgvector'],
  },
  {
    name: 'Quantum Product Service',
    summary: '花旗内部数据中台，支撑数据拉取、转换、分发和 SDK/API 服务，服务 200+ 下游系统。',
    tags: ['Storm', 'Kafka', 'Solace', 'Redis', 'Spring Cloud'],
  },
  {
    name: 'Quantum Account Service',
    summary: '交易员账户信息平台，负责核心开发、架构重构、SpringBoot 迁移与安全集成。',
    tags: ['Spring Cloud', 'Solace', 'CyberArk', 'DevOps'],
  },
  {
    name: 'Electronic Trading Attributes',
    summary: '交易属性平台，完成架构优化、数据库迁移、多活策略与基础设施升级。',
    tags: ['多活', '迁移', '稳定性', '基础设施'],
  },
];

const experience = [
  {
    period: '2025/10 - 至今',
    company: '杭州拓扑熵减科技有限公司',
    role: '合伙人',
    points: [
      '负责产品孵化与技术验证，使用 AI 工具快速交付 MVP 并验证可行性。',
      '推动 AI 工程化与基础设施建设，制定模型选型与降级策略。',
      '建立 AI 驱动研发规范，提升团队产能 3-5 倍。',
    ],
  },
  {
    period: '2019/11 - 2025/9',
    company: '花旗金融信息服务（中国）有限公司',
    role: '高级开发经理',
    points: [
      '负责架构搭建、数据拉取、转换、分发以及客户端 SDK 核心域构建。',
      '将 GC STW 从 120ms 降至 20ms 以下，接口响应从 200ms 降至 50ms 以内。',
      '落地异地多活架构，保障全球节点稳定运行。',
    ],
  },
  {
    period: '2019/4 - 2019/11',
    company: '链盟（上海）数字科技有限公司',
    role: 'Java 高级开发工程师',
    points: [
      '参与数字货币行情大数据分析平台开发与高并发模块建设。',
      '负责交易、红包、社区推荐等核心功能开发与性能优化。',
    ],
  },
];

function App() {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);

  const headlineWords = useMemo(
    () => ['AI 工程化', '高并发架构', '分布式系统', '企业级交付'],
    [],
  );

  useEffect(() => {
    const timeline = anime.timeline({ easing: 'easeOutExpo' });
    timeline
      .add({ targets: '.hero-badge', opacity: [0, 1], translateY: [18, 0], duration: 650 })
      .add({ targets: '.hero-title .line', opacity: [0, 1], translateY: [36, 0], duration: 850, delay: anime.stagger(120) }, '-=300')
      .add({ targets: '.hero-copy', opacity: [0, 1], translateY: [18, 0], duration: 700 }, '-=450')
      .add({ targets: '.hero-actions .button', opacity: [0, 1], translateY: [12, 0], duration: 550, delay: anime.stagger(100) }, '-=350')
      .add({ targets: '.metric', opacity: [0, 1], translateY: [14, 0], duration: 600, delay: anime.stagger(90) }, '-=200');
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x07111f, 6, 18);

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const group = new THREE.Group();
    scene.add(group);

    const coreGeometry = new THREE.IcosahedronGeometry(1.5, 1);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x74c7ff,
      metalness: 0.35,
      roughness: 0.18,
      emissive: 0x16324d,
      flatShading: true,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(core);

    const wire = new THREE.LineSegments(
      new THREE.EdgesGeometry(coreGeometry),
      new THREE.LineBasicMaterial({ color: 0xe6edf7, transparent: true, opacity: 0.65 }),
    );
    group.add(wire);

    const ringGeometry = new THREE.TorusGeometry(2.7, 0.04, 8, 120);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      emissive: 0x1a1036,
      metalness: 0.2,
      roughness: 0.4,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2.3;
    ring.rotation.y = Math.PI / 4;
    group.add(ring);

    const accentPoints = new THREE.Group();
    const pointGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const pointMaterial = new THREE.MeshStandardMaterial({ color: 0x22c55e, emissive: 0x0c2a13, metalness: 0.1, roughness: 0.2 });
    const accents = [
      [2.2, 0.5, 0.7],
      [-2.0, -0.8, 0.9],
      [0.7, 1.9, -0.5],
      [-0.8, -1.8, -0.7],
    ];
    accents.forEach(([x, y, z]) => {
      const point = new THREE.Mesh(pointGeometry, pointMaterial);
      point.position.set(x, y, z);
      accentPoints.add(point);
    });
    group.add(accentPoints);

    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0x9ed9ff, 2.1);
    key.position.set(5, 4, 6);
    scene.add(key);
    const fill = new THREE.PointLight(0x8b5cf6, 1.4, 20);
    fill.position.set(-4, -1, 4);
    scene.add(fill);

    const resize = () => {
      const width = canvas.parentElement?.clientWidth ?? 0;
      const height = canvas.parentElement?.clientHeight ?? 0;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const onMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      group.rotation.y = x * 0.8;
      group.rotation.x = -y * 0.45;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove);
    resize();

    let frame = 0;
    const animateScene = () => {
      frame += 0.01;
      core.rotation.x += 0.003;
      core.rotation.y += 0.004;
      ring.rotation.z += 0.0025;
      accentPoints.children.forEach((child, index) => {
        child.position.y += Math.sin(frame * 2 + index) * 0.0018;
      });
      renderer.render(scene, camera);
      requestAnimationFrame(animateScene);
    };
    animateScene();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach((node) => {
      const value = Number(node.getAttribute('data-count') || '0');
      anime({
        targets: node,
        innerHTML: [0, value],
        round: 1,
        duration: 1200,
        easing: 'easeOutQuad',
      });
    });
  }, []);

  return (
    <div className="page" ref={heroRef}>
      <main>
        <section className="hero section-shell">
          <div className="hero-content">
            <span className="hero-badge">AI 工程化 × 高并发架构</span>
            <h1 className="hero-title">
              <span className="line">张杰</span>
              <span className="line subtle">Java / Golang / Python</span>
              <span className="line accent">架构师</span>
            </h1>
            <p className="hero-copy">
              10 年软件开发与架构设计经验，长期专注高并发分布式系统、性能优化、服务治理与稳定性保障。
              近年聚焦 AI 工程化，具备从模型选型、RAG、NL2SQL 到企业级智能体落地的完整经验。
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#projects">查看项目</a>
              <a className="button ghost" href="mailto:solitary_j@163.com">联系我</a>
            </div>
            <div className="metrics">
              <div className="metric"><strong data-count="10">0</strong><span>年开发与架构经验</span></div>
              <div className="metric"><strong data-count="50000">0</strong><span>峰值 QPS 5 万+</span></div>
              <div className="metric"><strong data-count="4">0</strong><span>AI / 架构 / 优化 / 协作</span></div>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <canvas ref={canvasRef} />
            <div className="visual-caption">
              <span>能力星图</span>
              <p>{headlineWords.join(' · ')}</p>
            </div>
          </div>
        </section>

        <section className="section-shell" id="about">
          <div className="section-heading">
            <span>01</span>
            <h2>核心能力</h2>
          </div>
          <div className="grid four-up">
            {capabilities.map((item) => (
              <article className="card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell" id="projects">
          <div className="section-heading">
            <span>02</span>
            <h2>项目精选</h2>
          </div>
          <div className="grid two-up">
            {projects.map((project) => (
              <article className="card project-card" key={project.name}>
                <div className="project-head">
                  <h3>{project.name}</h3>
                </div>
                <p>{project.summary}</p>
                <div className="tag-row">
                  {project.tags.map((tag) => (
                    <span className="tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell" id="experience">
          <div className="section-heading">
            <span>03</span>
            <h2>工作经历</h2>
          </div>
          <div className="timeline">
            {experience.map((item) => (
              <article className="timeline-item card" key={item.company}>
                <div className="timeline-meta">
                  <span>{item.period}</span>
                  <strong>{item.company}</strong>
                  <em>{item.role}</em>
                </div>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell contact" id="contact">
          <div className="section-heading">
            <span>04</span>
            <h2>联系我</h2>
          </div>
          <div className="contact-card card">
            <p>如果你在找一位能做高并发系统、AI 工程化落地和复杂业务交付的技术负责人，可以直接联系我。</p>
            <div className="contact-links">
              <a href="mailto:solitary_j@163.com">solitary_j@163.com</a>
              <a href="tel:18817953369">18817953369</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
