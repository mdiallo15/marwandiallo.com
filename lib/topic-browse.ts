import { getAllPosts, type PostMeta } from "@/lib/writing";
import { getAllProjects, type Project } from "@/lib/projects";
import { TOPICS, type TopicDef, type TopicSlug } from "@/lib/topic-taxonomy";

export interface TopicCounts extends TopicDef {
  writingCount: number;
  projectCount: number;
  totalCount: number;
}

export function getAllTopicsWithCounts(): TopicCounts[] {
  const posts = getAllPosts();
  const projects = getAllProjects();
  return TOPICS.map((topic) => {
    const writingCount = posts.filter((post) => post.topic === topic.slug).length;
    const projectCount = projects.filter((project) => project.topic === topic.slug).length;
    return {
      ...topic,
      writingCount,
      projectCount,
      totalCount: writingCount + projectCount,
    };
  }).filter((topic) => topic.totalCount > 0);
}

export function getPostsByTopic(topic: TopicSlug): PostMeta[] {
  return getAllPosts().filter((post) => post.topic === topic);
}

export function getProjectsByTopic(topic: TopicSlug): Project[] {
  return getAllProjects().filter((project) => project.topic === topic);
}
